const User = require('../models/User');
const {
	RegisterSchema,
	LoginSchema,
} = require('../utils/validation_schema');

const { compare } = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
	process.env;

exports.registerUser = async (req, res, next) => {
	try {
		const result = await RegisterSchema.validateAsync(
			req.body
		);

		if (result.password !== result.confirmPassword) {
			const error = new Error('Password does not match');
			error.status = 422;
			throw error;
		}

		const existUserName = await User.findOne({
			username: result.username,
		});

		if (existUserName) {
			const error = new Error(
				'Username has already taken. Please try another name'
			);
			error.status = 422;
			throw error;
		}

		const existUser = await User.findOne({
			email: result.email,
		});

		if (existUser) {
			const error = new Error(
				'Email has already taken. Please enter another email address.'
			);
			error.status = 422;
			throw error;
		}

		const user = new User({
			username: result.username,
			email: result.email,
			password: result.password,
			profilePic: result.profilePic,
			userType: result.userType,
		});

		await user.save();

		res.status(200).json({
			message:
				'Congratulations, account created successfully. Please login',
		});
	} catch (error) {
		if (error.isJoi === true) error.status = 422;
		next(error);
	}
};

exports.loginUser = async (req, res, next) => {
	try {
		const result = await LoginSchema.validateAsync(
			req.body
		);

		const user = await User.findOne({
			email: result.email,
		});

		if (!user) {
			const error = new Error(
				'Email or Password does not match'
			);
			error.status = 400;
			throw error;
		}

		const validPassword = await compare(
			result.password,
			user.password
		);

		if (!validPassword) {
			const error = new Error(
				'Email or Password does not match'
			);
			error.status = 400;
			throw error;
		}

		const accessToken = sign(
			{ id: user.id, userType: user.userType, username: user.username },
			ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		);
		const refreshToken = sign(
			{
				id: user.id,
				userType: user.userType,
				username: user.username,
			},
			REFRESH_TOKEN_SECRET,
			{ expiresIn: '7d' }
		);

		user.refreshToken = refreshToken;

		await user.save();

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			path: '/api/auth/refresh_token',
		});

		res.status(200).json({
			message: 'Congratulations, logged in successfully.',
			accessToken,
		});
	} catch (error) {
		next(error);
	}
};

exports.logoutUser = async (req, res, next) => {
	try {
		res.clearCookie('refreshToken', {
			path: '/api/auth/refresh_token',
		});

		res
			.status(200)
			.json({ message: 'Logged out successfully.' });
	} catch (error) {
		next(error);
	}
};

exports.refreshToken = async (req, res, next) => {
	const token = req.cookies.refreshToken;

	if (!token) {
		return res.status(401).json({ accessToken: '' });
	}

	try {
		const { id } = verify(token, REFRESH_TOKEN_SECRET);
		const user = await User.findById(id);

		if (!user) {
			return res.status(401).json({ accessToken: '' });
		}

		const accessToken = sign(
			{
				id: user.id,
				userType: user.userType,
				username: user.username,
			},
			ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		);
		const refreshToken = sign(
			{
				id: user.id,
				userType: user.userType,
				username: user.username,
			},
			REFRESH_TOKEN_SECRET,
			{ expiresIn: '7d' }
		);

		user.refreshToken = refreshToken;

		await user.save();

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			path: '/api/auth/refresh_token',
		});

		res.status(200).json({
			accessToken,
		});
	} catch (error) {
		return res.status(401).json({ accessToken: '' });
	}
};

const { verify } = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const isAuth = (req) => {
	const authorization = req.headers['authorization'];
	if (!authorization) {
		const error = new Error('Please login');
		error.status = 401;
		throw error;
    }
    const token = authorization.split(' ')[1];
	const { id, username, userType } = verify(token, ACCESS_TOKEN_SECRET);
	return { id, username, userType };
};

module.exports = { isAuth };

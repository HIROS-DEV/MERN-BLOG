const Joi = require('joi');

const RegisterSchema = Joi.object({
	username: Joi.string().max(50).trim().required(),
	email: Joi.string()
		.email()
		.lowercase()
		.max(200)
		.trim()
		.required(),
	password: Joi.string().min(6).trim().required(),
	confirmPassword: Joi.string().min(6).trim().required(),
	profilePic: Joi.string().trim(),
	userType: Joi.string().trim(),
	refreshToken: Joi.string().trim(),
});

const LoginSchema = Joi.object({
	email: Joi.string()
		.email()
		.lowercase()
		.max(200)
		.trim()
		.required(),
	password: Joi.string().min(6).trim().required(),
	refreshToken: Joi.string().trim(),
});

const BlogSchema = Joi.object({
	title: Joi.string().max(50).trim().required(),
	description: Joi.string().max(300000).trim().required(),
	image: Joi.string()
		.trim()
		.required()
		.pattern(
			/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
		)
		.message({
			'string.pattern.base':
				'Invalid image url. Please try again',
		}),
	creator: Joi.string().trim(),
});

const UpdatedBlogSchema = Joi.object({
	title: Joi.string().max(50).trim(),
	description: Joi.string().max(300000).trim(),
	image: Joi.string()
		.trim()
		.pattern(
			/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/
		)
		.message({
			'string.pattern.base':
				'Invalid image url. Please try again',
		}),
});

const CommentSchema = Joi.object({
	comment: Joi.string().max(30000).trim().required(),
	blogId: Joi.string().trim(),
});

module.exports = {
	RegisterSchema,
	LoginSchema,
	BlogSchema,
	UpdatedBlogSchema,
	CommentSchema,
};

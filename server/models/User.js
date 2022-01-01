const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			max: 50,
			unique:true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		profilePic: {
			type: String,
			trim: true,
			default: '',
		},
		refreshToken: {
			type: String,
			trim: true,
		},
		userType: {
			type: String,
			trim: true,
			enum: ['user', 'admin'],
			default: 'user',
		},
		blogs: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Blog',
			},
		],
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{
		timestamps: true,
	}
);

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	try {
		this.password = await hash(this.password, 12);
		next();
	} catch (error) {
		return next(error);
	}
});

module.exports = mongoose.model('User', UserSchema);

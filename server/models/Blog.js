const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			max: 50,
		},
		description: {
			type: String,
			required: true,
			trim: true,
			max: 300000,
		},
		image: {
			type: String,
			trim: true,
			required: true,
		},
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
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

module.exports = mongoose.model('Blog', BlogSchema);

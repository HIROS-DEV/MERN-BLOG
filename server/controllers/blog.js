const User = require('../models/User');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

const { isAuth } = require('../middlewares/isAuth');
const {
	BlogSchema,
	UpdatedBlogSchema,
	CommentSchema,
	DeletedCommentSchema,
} = require('../utils/validation_schema');

const mongoose = require('mongoose');

exports.getAllBlogs = async (req, res, next) => {
	try {
		const blogs = await Blog.find().populate(
			'creator',
			'username'
		).populate('comments');
		res.status(200).json({ blogs });
	} catch (error) {
		next(error);
	}
};

exports.getOneBlog = async (req, res, next) => {
	const _id = req.params.id;
	try {
		const blog = await Blog.findOne({_id}).populate(
			'creator',
			'username'
		).populate('comments');

		if (!blog) {
			const error = new Error('Blog not found.');
			error.status = 404;
			throw error;
		}

		res.status(200).json({ blog});
	} catch (error) {
		next(new Error('Blog not found.'));
	}
};

exports.createBlog = async (req, res, next) => {
	try {
		const { id, userType } = isAuth(req);

		if (userType !== 'admin') {
			const error = new Error(
				'Sorry, only Admin user can create Blog'
			);
			error.status = 403;
			throw error;
		}

		const result = await BlogSchema.validateAsync(req.body);

		const blog = new Blog({
			title: result.title,
			description: result.description,
			image: result.image,
			creator: id,
		});

		await blog.save();

		res
			.status(200)
			.json({ message: 'Blog created successfully.' });
	} catch (error) {
		next(error);
	}
};

exports.deleteBlog = async (req, res, next) => {
	try {
		const { userType } = isAuth(req);

		if (userType !== 'admin') {
			const error = new Error(
				'Sorry, only Admin user can delete Blog'
			);
			error.status = 403;
			throw error;
		}

		// change id to use mongoDB
		const _id = await mongoose.Types.ObjectId(
			req.params.id
		);

		const blog = await Blog.findOneAndDelete({ _id });

		if (!blog) {
			const error = new Error('Blog not found.');
			error.status = 404;
			throw error;
		}

		res
			.status(200)
			.json({ message: 'Blog deleted successfully.' });
	} catch (error) {
		next(error);
	}
};

exports.updateBlog = async (req, res, next) => {
	try {
		const { userType } = isAuth(req);

		if (userType !== 'admin') {
			const error = new Error(
				'Sorry, only Admin user can update Blog'
			);
			error.status = 403;
			throw error;
		}

		const result = await UpdatedBlogSchema.validateAsync(
			req.body
		);

		const _id = await mongoose.Types.ObjectId(
			req.params.id
		);

		const updatedBlog = await Blog.findOneAndUpdate(
			{ _id },
			{ $set: result },
			{ new: true }
		);

		res.status(200).json({
			message: 'Blog updated successfully.',
		});
	} catch (error) {
		next(error);
	}
};

exports.createComment = async (req, res, next) => {
	const blogId = req.params.id;

	try {
		const { id } = isAuth(req);

		if (!id) {
			const error = new Error(
				'Sorry, only Admin user can update Blog'
			);
			error.status = 403;
			throw error;
		}

		const { username } = await User.findById(id);

		const result = await CommentSchema.validateAsync(
			req.body
		);

		const comment = new Comment({
			username: username,
			comment: result.comment,
			blogId: id,
		});

		await comment.save();

		const relatedBlog = await Blog.findById(blogId);

		relatedBlog.comments.push(comment);
		await relatedBlog.save();

		res
			.status(200)
			.json({ message: 'Comment created successfully.' });
	} catch (error) {
		next(error);
	}
};

exports.deleteComment = async (req, res, next) => {
	const { commentid } = req.params;
	const blogId = req.params.id;
	try {
		const { id } = isAuth(req);

		const user = await User.findById({ _id: id });

		const comment = await Comment.findOne({
			_id: commentid,
		});

		if (
			user.username === comment.username ||
			user.userType === 'admin'
		) {
			await Blog.findByIdAndUpdate(
				blogId,
				{
					$pull: { comments: commentid },
				},
				{ new: true }
			);
			await Comment.findOneAndDelete({
				_id: commentid,
			});
			res.status(200).json({
				message: 'Comment deleted successfully.',
			});
		} else {
			const error = new Error(
				'Sorry, you can delete only your comment'
			);
			error.status = 403;
			throw error;
		}
	} catch (error) {
		if (
			error.message ===
			"Cannot read property 'username' of null"
		) {
			const error = new Error('Comment not found.');
			error.status = 404;
			next(error);
		}
		next(error);
	}
};

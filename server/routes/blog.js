const router = require('express').Router();
const {
	getAllBlogs,
	getOneBlog,
	createBlog,
	updateBlog,
	deleteBlog,
	createComment,
	deleteComment
} = require('../controllers/blog');

router.get('/', getAllBlogs);
router.post('/', createBlog);
router.get('/:id', getOneBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.post('/:id/comment', createComment);
router.delete('/:id/comment/:commentid', deleteComment);

module.exports = router;
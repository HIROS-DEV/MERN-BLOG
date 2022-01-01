const router = require('express').Router();
const {
	registerUser,
	loginUser,
	logoutUser,
	refreshToken
} = require('../controllers/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh_token', refreshToken);

module.exports = router;
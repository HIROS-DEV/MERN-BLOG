require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const connectDB = require('./db/db');

const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blog');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'https://hirosdev-mern-blog.netlify.app',
		],
		credentials: true,
	})
);

app.get('/', (req, res, next) => {
	res.status(200).send('This API is working!!!');
});

app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);

app.use((req, res, next) => {
	next(createError.NotFound("This route does not exist."));
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.send({
		error: {
			status: error.status || 500,
			message: error.message,
		},
	});
});

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on port ${PORT}`);
});

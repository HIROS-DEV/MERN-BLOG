import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import baseURL from '../api';

const CreateArticle = () => {
	const navigate = useNavigate();

	// eslint-disable-next-line no-unused-vars
	const [user, setUser, fetchData] =
		useContext(UserContext);

	const [errorMsg, setErrorMsg] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);

	const [blogs, setBlog] = useState({
		title: '',
		image: '',
		description: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setBlog({ ...blogs, [name]: value });
	};

	const clearBlog = () => {
		setBlog({
			title: '',
			image: '',
			description: '',
		});
	};

	const handleSumit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${baseURL}/blog`, {
				method: 'POST',
				body: JSON.stringify({
					title: blogs.title,
					image: blogs.image,
					description: blogs.description,
				}),
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${user.accessToken}`,
				},
			});

			const result = await response.json();

			if (!response.ok) {
				return setErrorMsg(result.error.message);
			}

			setErrorMsg(null);
			setSuccessMsg(result.message);
			setBlog({
				title: '',
				image: '',
				description: '',
			});

			fetchData();

			setTimeout(() => {
				setSuccessMsg(null);
				navigate('/');
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section className='create__article'>
			<div>
				<form method='post' onSubmit={handleSumit}>
					{errorMsg && (
						<p className='article__errorMsg'>{errorMsg}</p>
					)}
					{successMsg && (
						<p className='article__successMsg'>
							{successMsg}
						</p>
					)}
					<label htmlFor='title'>
						Title <span>*</span>
					</label>
					<input
						type='text'
						id='title'
						name='title'
						placeholder='Title of your blog post'
						onChange={handleChange}
						value={blogs.title}
					/>
					<label htmlFor='image'>Image URL</label>
					<input
						type='text'
						id='image'
						name='image'
						placeholder='Link of the image you want to insert'
						onChange={handleChange}
						value={blogs.image}
					/>
					<label htmlFor='description'>
						Description <span>*</span>
					</label>
					<textarea
						type='text'
						id='description'
						name='description'
						placeholder='Content of your blog post'
						onChange={handleChange}
						value={blogs.description}
					/>

					<button className='article__post'>Post</button>
					<button
						className='article__clear'
						onClick={clearBlog}
						type='button'
					>
						Clear
					</button>
				</form>
			</div>
		</section>
	);
};

export default CreateArticle;

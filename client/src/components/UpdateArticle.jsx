import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../App';
import baseURL from '../api';

const UpdateArticle = () => {
	const navigate = useNavigate();
	const { id } = useParams();

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

	const [clearData, setClearData] = useState({
		title: '',
		image: '',
		description: '',
	});

    const clearBlog = (e) => {
        setBlog({
            title: clearData.title,
            image: clearData.image,
            description: clearData.description,
        });
    };

	const handleChange = (e) => {
		const { name, value } = e.target;
		setBlog({ ...blogs, [name]: value });
	};


	const updateFunc = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${baseURL}/blog/${id}`, {
				method: 'PUT',
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

	useEffect(() => {
		const fetchBlogData = async () => {
			try {
				const { blog } = await (
					await fetch(`${baseURL}/blog/${id}`)
				).json();
				setBlog({
					title: blog.title,
					image: blog.image,
					description: blog.description,
				});
				setClearData({
					title: blog.title,
					image: blog.image,
					description: blog.description,
				});
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchBlogData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className='create__article'>
			<div>
				<form method='post' onSubmit={updateFunc}>
					<img
						className='article__image'
						src={clearData.image}
						alt={clearData.title}
					/>
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
						value={blogs.title}
						onChange={handleChange}
					/>
					<label htmlFor='image'>Image URL</label>
					<input
						type='text'
						id='image'
						name='image'
						placeholder='Link of the image you want to insert'
						value={blogs.image}
						onChange={handleChange}
					/>
					<label htmlFor='description'>
						Description <span>*</span>
					</label>
					<textarea
						type='text'
						id='description'
						name='description'
						placeholder='Content of your blog post'
						value={blogs.description}
						onChange={handleChange}
					/>

					<button className='article__post'>UPDATE</button>
					<button
						className='article__clear'
						type='button'
						onClick={clearBlog}
					>
						Clear
					</button>
				</form>
			</div>
		</section>
	);
};

export default UpdateArticle;

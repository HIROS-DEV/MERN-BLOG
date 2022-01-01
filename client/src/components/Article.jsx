import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { UserContext } from '../App';
import baseURL from '../api';
import Comments from './Comments';

const Article = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [decodeUser, setDecodeUser] = useState({
		username: '',
		userType: '',
	});

	const [user, setUser, fetchData] =
		useContext(UserContext);
	const [blog, setBlog] = useState([]);

	const fetchBlogData = async () => {
		try {
			const res = await fetch(`${baseURL}/blog/${id}`);
			const { blog } = await res.json();
			setBlog(blog);
		} catch (error) {
			console.log(error.message);
		}
	};

	const updateArticle = (e) => {
		navigate(`/blog/${id}/update/${id}`);
	};

	const deleteArticle = async (e) => {
		const alertMsg = window.confirm(
			'Are you sure you wish to delete this article?'
		);

		if (alertMsg) {
			try {
				const response = await fetch(
					`${baseURL}/blog/${id}`,
					{
						method: 'DELETE',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
							authorization: `Bearer ${user.accessToken}`,
						},
					}
				);
				const data = await response.json();
				window.alert(data.message);
				fetchData();
				navigate('/');
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		if (user.accessToken !== '') {
			const { username, userType } = jwt_decode(
				user.accessToken
			);
			setDecodeUser({ username, userType });
		}
	}, [user.accessToken]);

	useEffect(() => {
		fetchBlogData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className='article'>
			<article>
				<div>
					{decodeUser.userType === "admin" && (
						<span className='article__editWrapper'>
							<i
								className='far fa-edit'
								onClick={updateArticle}
							></i>
							<i
								className='fas fa-trash'
								onClick={deleteArticle}
							></i>
						</span>
					)}
					<h1>{blog.title}</h1>
					<p>
						{' '}
						{new Date(blog.createdAt).toLocaleDateString(
							'en-us',
							{
								weekday: 'long',
								year: 'numeric',
								month: 'short',
								day: 'numeric',
							}
						)}
					</p>
					<img src={blog.image} alt={blog.title} />
					<h2>{blog.description}</h2>
				</div>
				<Comments />
			</article>
		</section>
	);
};

export default Article;

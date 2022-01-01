import {
	useEffect,
	useState,
	useRef,
	useContext,
} from 'react';
import { useParams } from 'react-router-dom';
import baseURL from '../api';
import CommentCard from './CommentCard';
import { UserContext } from '../App';

const Comments = () => {
	const { id } = useParams();
	const formRef = useRef();
	const [user, setUser, fetchData] =
		useContext(UserContext);

	const [errorMsg, setErrorMsg] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);

	const [newComment, setNewComment] = useState({
		comment: '',
	});

	const [comments, setComments] = useState([]);

	const fetchCommentData = async () => {
		try {
			const res = await fetch(`${baseURL}/blog/${id}`);
			const { blog } = await res.json();

			setComments(blog.comments);
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewComment({ ...newComment, [name]: value });
	};

	const createNewComment = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`${baseURL}/blog/${id}/comment`,
				{
					method: 'POST',
					body: JSON.stringify({
						comment: newComment.comment,
					}),
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${user.accessToken}`,
					},
					credentials: 'include',
				}
			);

			const result = await response.json();

			if (!response.ok) {
				setTimeout(() => {
					setErrorMsg(null);
				}, 2000);
				return setErrorMsg(result.error.message);
			}

			setErrorMsg(null);
			setSuccessMsg(result.message);

			setNewComment({
				description: '',
			});

			fetchCommentData();

			setTimeout(() => {
				formRef.current.reset();
				setSuccessMsg(null);
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCommentData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className='article__comments'>
			{errorMsg && (
				<p className='article__errorMsg'>{errorMsg}</p>
			)}
			{successMsg && (
				<p className='article__successMsg'>{successMsg}</p>
			)}
			{user.accessToken && (
				<form
					method='post'
					onSubmit={createNewComment}
					ref={formRef}
				>
					<label
						htmlFor='comment'
						className='comments__label'
					>
						Comment <span>*</span>
					</label>
					<textarea
						type='text'
						id='comment'
						name='comment'
						placeholder='Comment'
						onChange={handleChange}
					/>
					<button>Comment</button>
				</form>
			)}

			<p>
				Comments <span>{comments.length}</span>
			</p>

			{comments &&
				comments.map((comment) => {
					return (
						<CommentCard
							key={comment._id}
							comment={comment}
							fetchCommentData={fetchCommentData}
						/>
					);
				})}
		</section>
	);
};

export default Comments;

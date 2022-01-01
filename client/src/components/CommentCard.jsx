import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import jwt_decode from 'jwt-decode';
import baseURL from '../api';

const CommentCard = ({ comment, fetchCommentData }) => {
	const { id } = useParams();

	const [user, setUser, fetchData] =
		useContext(UserContext);

	const [decodeUser, setDecodeUser] = useState({
		username: '',
		userType: '',
	});


	const deleteComment = async (e) => {
		try {
			const alertMsg = window.confirm(
				'Are you sure you wish to delete this article?'
			);
			if (alertMsg) {
				const res = await fetch(
					`${baseURL}/blog/${id}/comment/${comment._id}`,
					{
						method: 'DELETE',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
							authorization: `Bearer ${user.accessToken}`,
						},
					}
				);
				const data = await res.json();
				window.alert(data.message);
				fetchCommentData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user.accessToken !== '') {
			const { username, userType } = jwt_decode(user.accessToken);
			setDecodeUser({username, userType});
		}
	}, [user.accessToken]);

	return (
		<section className='comments__card'>
			<p>
				<span>{comment.username}</span>&nbsp;-&nbsp;
				<span>
					{' '}
					{new Date(comment.createdAt).toLocaleDateString(
						'en-us',
						{
							weekday: 'long',
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						}
					)}
				</span>
				{(decodeUser.username === comment.username || decodeUser.userType === "admin") && (
					<span className='card__delete'>
						<i
							className='fas fa-trash'
							onClick={deleteComment}
						></i>
					</span>
				)}
			</p>
			<h3>{comment.comment} </h3>
		</section>
	);
};

export default CommentCard;

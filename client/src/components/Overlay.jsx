import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import jwt_decode from 'jwt-decode';
import baseURL from '../api';

const Overlay = () => {
	const navigate = useNavigate();
	const [user, setUser] = useContext(UserContext);

	const [decodeUser, setDecodeUser] = useState({
		username: '',
		userType: '',
	});

	const closeFunc = () => {
		document
			.querySelector('.overlay')
			.classList.remove('visible');
		window.scrollTo(0, 0);
	};

	const backHomeFunck = () => {
		navigate('/');
		document
			.querySelector('.overlay')
			.classList.remove('visible');
		window.scrollTo(0, 0);
	};

	const loginFunc = () => {
		navigate('/login');
		document
			.querySelector('.overlay')
			.classList.remove('visible');
	};

	const createFunc = () => {
		navigate('/create');
		document
			.querySelector('.overlay')
			.classList.remove('visible');
	};

	const logoutFunc = async () => {
		try {
			await fetch(`${baseURL}/auth/logout`, {
				method: 'POST',
				credentials: 'include',
			});

			setUser({
				accessToken: '',
			});
			alert('Logged out successfully!!!');
			document
				.querySelector('.overlay')
				.classList.remove('visible');
			navigate('/');
		} catch (error) {
			console.log(error);
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

	return (
		<div className='overlay'>
			<div className='overlay__timesWrapper'>
				<i
					className='fas fa-times fa-3x'
					onClick={closeFunc}
				></i>
			</div>
			<ul>
				<li onClick={backHomeFunck}>Home</li>
				<div>
					{!user.accessToken && (
						<li onClick={loginFunc}>Login</li>
					)}
					{user.accessToken && (
						<div>
							{decodeUser.userType === 'admin' && (
							<li onClick={createFunc}>Create</li>
							)}
							<li
								onClick={logoutFunc}
								className='logoutBtn'
							>
								Logout
							</li>
						</div>
					)}
				</div>
				<li>
					{' '}
					<a
						href='https://github.com/HIROS-DEV'
						target='_blank'
						rel='noreferrer'
					>
						<i className='fab fa-github fa-2x'></i>
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Overlay;

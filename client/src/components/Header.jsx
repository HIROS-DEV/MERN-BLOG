import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import baseURL from '../api';
import { UserContext } from '../App';

const Header = () => {
	const navigate = useNavigate();
	const [user, setUser] = useContext(UserContext);

	const [decodeUser, setDecodeUser] = useState({
		username: '',
		userType: '',
	});

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
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const toggleMenu = () => {
		document
			.querySelector('.overlay')
			.classList.toggle('visible');
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
		<header>
			<ul className='header__desktopUL'>
				<div className='header__logoWrapper'>
					<li>
						<Link to='/'>
							<i className='fas fa-blog fa-lg'></i>
						</Link>
					</li>
					<li>
						<Link to='/'>Hiro's dev</Link>
					</li>
				</div>
				<div className='header__center'>
					<h1>
						<Link to='/'>Hiro's dev</Link>
					</h1>
					<p>
						Hello, everyone. <br /> This is simple BLOG
						using MERN
					</p>
				</div>
				<div>
					{!user.accessToken && (
						<li>
							<Link to='/login'>Login</Link>
						</li>
					)}
					{user.accessToken && (
						<div>
							{decodeUser.userType === 'admin' && (
								<li
									className='header__create'
									style={{display: 'flex', alignItems:"center", opacity:'1'}}
								>
									<Link to='/create'>Create</Link>
								</li>
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
			</ul>

			<div>
				<ul className='header__responsiveUL'>
					<div className='header__logoWrapper'>
						<li>
							<Link to='/'>
								<i className='fas fa-blog fa-lg'></i>
							</Link>
						</li>
						<li>
							<Link to='/'>Hiro's dev</Link>
						</li>
					</div>
					<div>
						<li onClick={toggleMenu}>
							<i className='fas fa-bars'></i>
						</li>
					</div>
				</ul>
			</div>
		</header>
	);
};

export default Header;

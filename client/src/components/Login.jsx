import { useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import baseURL from '../api';

const Login = () => {
	// eslint-disable-next-line no-unused-vars
	const [user,setUser] = useContext(UserContext);
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});
	const [errorMsg, setErrorMsg] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginData({ ...loginData, [name]: value });
	};

	const LoginFunc = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${baseURL}/auth/login`,
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: loginData.email,
						password: loginData.password,
					}),
				}
			);
			const result = await response.json();

			if (!response.ok) {
				return setErrorMsg(result.error.message);
			}

			setErrorMsg(null);
			setSuccessMsg(result.message);
			setLoginData({
				email: '',
				password: '',
			});
			setUser({
				accessToken: result.accessToken,
			});

			setTimeout(() => {
				setSuccessMsg(null);
				navigate('/');
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	const goBack = () => {
		navigate('/');
	};

	return (
		<section className='login'>
			<h1>HIRO'S DEV</h1>
			<form onSubmit={LoginFunc}>
				<h1>Log In</h1>
				{errorMsg && (
					<p className='login__errorMsg'>{errorMsg}</p>
				)}
				{successMsg && (
					<p className='login__successMsg'>{successMsg}</p>
				)}
				<input
					type='text'
					placeholder='Email'
					name='email'
					id='email'
					required
					onChange={handleChange}
				/>
				<input
					type='password'
					placeholder='Password'
					name='password'
					id='password'
					required
					autoComplete='password'
					onChange={handleChange}
				/>
				<button className='login__btn'>Log In</button>
				<button type='button' onClick={goBack}>
					Go Back
				</button>
				<p className='login__register'>Don't have an account? <span><Link to="/register">Register here.</Link></span></p>
			</form>
		</section>
	);
};

export default Login;

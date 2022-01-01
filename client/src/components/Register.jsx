import { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import baseURL from '../api';

const Register = () => {
	// eslint-disable-next-line no-unused-vars
	const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        username: '',
		email: '',
        password: '',
        confirmPassword: ''
	});
	const [errorMsg, setErrorMsg] = useState(null);
	const [successMsg, setSuccessMsg] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setRegisterData({ ...registerData, [name]: value });
	};

	const LoginFunc = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`${baseURL}/auth/register`,
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
                    body: JSON.stringify({
                        username: registerData.username,
						email: registerData.email,
                        password: registerData.password,
                        confirmPassword: registerData.confirmPassword
					}),
				}
			);
            const result = await response.json();

			if (!response.ok) {
				return setErrorMsg(result.error.message);
			}

			setErrorMsg(null);
			setSuccessMsg(result.message);
			setRegisterData({
				email: '',
				password: '',
			});

			setTimeout(() => {
				setSuccessMsg(null);
				navigate('/login');
			}, 2000);
		} catch (error) {
			console.log(error);
		}
	};

	const goBack = () => {
		navigate('/');
	};

	return (
		<section className='register'>
			<h1>HIRO'S DEV</h1>
			<form onSubmit={LoginFunc}>
				<h1>Register</h1>
				{errorMsg && (
					<p className='register__errorMsg'>{errorMsg}</p>
				)}
				{successMsg && (
					<p className='register__successMsg'>
						{successMsg}
					</p>
				)}
				<input
					type='text'
					placeholder='Username'
					name='username'
					id='username'
					required
					onChange={handleChange}
				/>
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
				<input
					type='password'
					placeholder='Confirm Password'
					name='confirmPassword'
					id='confirmPassword'
					required
					autoComplete='confirmPassword'
					onChange={handleChange}
				/>
				<button className='register__btn'>Register</button>
				<button type='button' onClick={goBack}>
					Go Back
				</button>
				<p className='register__login'>
					Already have an account?{' '}
					<span>
						<Link to='/login'>Login here.</Link>
					</span>
				</p>
			</form>
		</section>
	);
};

export default Register;

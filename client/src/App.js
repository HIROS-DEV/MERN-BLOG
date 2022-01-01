import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './components/Login';
import Sticky from './components/Sticky';
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import Notfound from './pages/Notfound';
import baseURL from './api';
import Overlay from './components/Overlay';
import UpdateArticle from './components/UpdateArticle';
import Register from './components/Register';

export const UserContext = React.createContext([]);

function App() {
	const [blogs, setBlogs] = useState([]);

	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({
		accessToken: '',
	});

	const fetchData = async () => {
		try {
			const { blogs } = await (
				await fetch(`${baseURL}/blog`)
			).json();
			setBlogs(blogs);
			setLoading(false);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		const checkRefreshToken = async () => {
			const result = await (
				await fetch(`${baseURL}/auth/refresh_token`, {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
				})
			).json();
			setUser({ accessToken: result.accessToken });
		};
		checkRefreshToken();
	}, []);

	if (loading) return <div className='loader'></div>;

	return (
		<UserContext.Provider
			value={[user, setUser, fetchData]}
		>
			<div className='app'>
				<Header />
				<Routes>
					<Route
						path='/'
						element={
							<Home blogs={blogs} loading={loading} />
						}
					/>
					<Route
						path='/blog/:id'
						element={<Article blogs={blogs} />}
					/>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route
						path='/create'
						element={<CreateArticle />}
					/>
					<Route
						path='/blog/:id/update/:id'
						element={<UpdateArticle />}
					/>
					<Route path='*' element={<Notfound />} />
				</Routes>
				<Sticky />
				<Overlay />
			</div>
		</UserContext.Provider>
	);
}

export default App;

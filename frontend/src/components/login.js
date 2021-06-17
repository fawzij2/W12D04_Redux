import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../reducer/login';
import jwt from "jsonwebtoken"

const Login = () => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();
	const state = useSelector((state) => state.login.token)

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login();
		if (loggedIn) {
			history.push('/dashboard');
		}
	};

	const redirect = () => {
		if (loggedIn) {
			history.push('/dashboard');
		}
	};

	useEffect(() => {
		saveToken(localStorage.getItem('token'));
	}, []);

	function saveToken(token) {
		const user = jwt.decode(token);
		if (user) {
			dispatch(setToken(token));
			localStorage.setItem('token', token);
		}
	}

	async function login() {
		try {
			const res = await axios.post('http://localhost:5000/login', {
				email,
				password,
			});

			dispatch(setToken(res.data.token));
			localStorage.setItem('token', res.data.token);
			console.log(res.data)
			setLoggedIn(true);
		} catch (error) {
			setMessage(error.response.data);
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="email here"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password here"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button>Login</button>
			</form>

			{redirect()}
			{message && <div>{message}</div>}
		</>
	);
};

export default Login;

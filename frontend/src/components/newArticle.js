import React, { useContext, useState } from 'react';
import { NewArticleContext } from './../context/newArticle';
import axios from 'axios';
import { addArticle } from '../reducer/article';
import { useDispatch, useSelector } from 'react-redux';
import jwt from "jsonwebtoken";

const NewArticle = () => {
	const newArticleContext = useContext(NewArticleContext);

	const dispatch = useDispatch()
	const state = useSelector((state) => {
		return{
			articles: state.articles.article,
			login: state.login.token
		}
	})

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		await createNewArticle();
	};

	function validateToken() {
		const user = jwt.decode(state.login);
		if (!user) throw new Error();
	}

	async function createNewArticle() {
		try {
			validateToken();
			const newArticle = await axios.post(
				'http://localhost:5000/articles',
				{
					title,
					description,
				},
				{
					headers: {
						Authorization: `Bearer ${state.login}`,
					},
				},
			);

			dispatch(addArticle(newArticle))

			setMessage('The article has been created successfully');
		} catch (error) {
			console.log(error);
			setMessage(
				'Error happened while creating a new article, please try again',
			);
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="article title here"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<textarea
					placeholder="article description here"
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
				<button>Create New Article</button>
			</form>

			{message && <div>{message}</div>}
		</>
	);
};

export default NewArticle;

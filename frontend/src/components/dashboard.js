import React, { useContext, useEffect, useState } from 'react';
import { DashboardContext } from './../context/dashboard';
import { LoginContext } from './../context/login';
import { setArticles, updateArticle, deleteArticle } from '../reducer/article';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';


const Dashboard = () => {
	const dashboardContext = useContext(DashboardContext);
	const loginContext = useContext(LoginContext);
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [updateBox, setUpdateBox] = useState(false);

	const state = useSelector((state) => {
		return {
			articles: state.articles.article
		}
	})

	const handleClick = async () => {
		console.log("hello there")
		await getAllArticles();
		setShow(!show);
	};

	const handleUpdateClick = (article) => {
		setUpdateBox(!updateBox)
		if (updateBox) updateArticleById(article._id);
	};

	useEffect(() => {
		getAllArticles();
	}, []);

	async function getAllArticles() {
		try {
			const res = await axios.get('http://localhost:5000/articles');
			console.log(res.data);
			dispatch(setArticles(res.data));
		} catch (error) {
			console.log(error);
		}
	}

	async function updateArticleById(id) {
		try {
			axios.put(`http://localhost:5000/articles/${id}`, {
				title,
				description,
			}).then((res)=>{
			console.log('updated: ', res)
			dispatch(updateArticle(res.data))
			// getAllArticles();
		}).catch((err)=>{console.log(err.response)})
	 }catch (error) {
			console.log(error);
		}
	}

	async function deleteArticleById(id) {
		try {
			const res = await axios.delete(`http://localhost:5000/articles/${id}`);
			dispatch(deleteArticle(id))
			// getAllArticles();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<br />
			<button onClick={handleClick}>Get All Articles</button>
			{show &&
				state.articles.map((article) => (
					<div key={article._id}>
						<div>Title: {article.title}</div>
						<div>Description: {article.description}</div>
						{/* <div>author: {article.author.firstName}</div> */}
						
							<>
								<button
									onClick={() => deleteArticleById(article._id)}
								>
									X
								</button>
								{updateBox &&
									(
										<form>
											<input
												type="text"
												defaultValue={article.title}
												placeholder="article title here"
												onChange={(e) =>
													setTitle(e.target.value)
												}
											/>
											<textarea
												placeholder="article description here"
												defaultValue={article.description}
												onChange={(e) =>
													setDescription(e.target.value)
												}
											></textarea>
										</form>
									)}
								<button onClick={() => handleUpdateClick(article)}>
									Update
								</button>
							</>
						
						<hr />
					</div>
				))}
		</>
	);
};

export default Dashboard;

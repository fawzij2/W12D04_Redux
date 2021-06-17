import React, { useContext, useEffect, useState } from 'react';
import { DashboardContext } from './../context/dashboard';
import { LoginContext } from './../context/login';
import { setArticles } from '../reducer/article';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';


const Dashboard = () => {
	const dashboardContext = useContext(DashboardContext);
	const loginContext = useContext(LoginContext);
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);

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
		dashboardContext.setUpdateBox(!dashboardContext.updateBox);
		dashboardContext.setArticleId(article._id);
		dashboardContext.setTitle(article.title);
		dashboardContext.setDescription(article.description);
		if (dashboardContext.updateBox) dashboardContext.updateArticle(article._id);
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
						{article.author && (
							<>
								<button
									onClick={() => dashboardContext.deleteArticle(article._id)}
								>
									X
								</button>
								{dashboardContext.updateBox &&
									article._id && (
										<form>
											<input
												type="text"
												defaultValue={article.title}
												placeholder="article title here"
												onChange={(e) =>
													dashboardContext.setTitle(e.target.value)
												}
											/>
											<textarea
												placeholder="article description here"
												defaultValue={article.description}
												onChange={(e) =>
													dashboardContext.setDescription(e.target.value)
												}
											></textarea>
										</form>
									)}
								<button onClick={() => handleUpdateClick(article)}>
									Update
								</button>
							</>
						)}
						<hr />
					</div>
				))}
		</>
	);
};

export default Dashboard;

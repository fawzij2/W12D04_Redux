import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from "./reducer/index";

//context providers
import RegisterProvider from './context/register';
import LoginProvider from './context/login';
import NewArticleProvider from './context/newArticle';
import DashboardProvider from './context/dashboard';

ReactDOM.render(
	<Router>
		<LoginProvider>
			<RegisterProvider>
				<NewArticleProvider>
					<DashboardProvider>
						<Provider store={store}>
						    <App />
						</Provider>
					</DashboardProvider>
				</NewArticleProvider>
			</RegisterProvider>
		</LoginProvider>
	</Router>,
	document.getElementById('root'),
);

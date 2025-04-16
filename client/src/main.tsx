import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleVideo from './pages/SingleVideo.js';
import UserFavorites from './pages/UserFavorites.js';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/signup',
				element: <Signup />,
			},
			{
				path: '/profiles/:username',
				element: <UserFavorites />,
			},
			{
				path: '/me',
				element: <UserFavorites />,
			},
			{
				path: '/videos/:videoId',
				element: <SingleVideo />,
			},
		],
	},
]);

const rootElement = document.getElementById('root');
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

'use client';

// @packages
import { ToastContainer } from 'react-toastify';

// @scripts
import { AuthProvider } from 'app/context/auth.context';
import { UserMoviesProvider } from 'app/context/userMovies.context';

// @styles
import 'react-toastify/dist/ReactToastify.css';

export const Providers = ({ children }) => {
	return (
		<AuthProvider>
			<UserMoviesProvider>{children}</UserMoviesProvider>
			<ToastContainer autoClose={5000} closeOnClick position='bottom-right' />
		</AuthProvider>
	);
};

export default Providers;

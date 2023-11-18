// @packages
import type { Metadata } from 'next';

// @components
import Auth from 'app/containers/Auth';
import Login from 'app/containers/Login';

export const metadata: Metadata = {
	title: 'Login',
};

const LoginPage = () => {
	return (
		<Auth>
			<Login />
		</Auth>
	);
};

export default LoginPage;

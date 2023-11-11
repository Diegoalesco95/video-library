// @packages
import type { Metadata } from 'next';

// @components
import Auth from 'app/containers/Auth';
import Signup from 'app/containers/Signup';

export const metadata: Metadata = {
	title: 'Signup',
};

const LoginPage = () => {
	return (
		<Auth>
			<Signup />
		</Auth>
	);
};

export default LoginPage;

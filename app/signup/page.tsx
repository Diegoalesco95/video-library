'use client';

// @scripts
import useAuth from 'app/hooks/useAuth';
// @components
import Signup from 'app/containers/Signup';

const LoginPage = () => {
	useAuth();
	return <Signup />;
};

export default LoginPage;

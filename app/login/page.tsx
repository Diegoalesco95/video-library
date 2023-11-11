'use client';

// @scripts
import useAuth from 'app/hooks/useAuth';
// @components
import Login from 'app/containers/Login';

const LoginPage = () => {
	useAuth();

	return <Login />;
};

export default LoginPage;

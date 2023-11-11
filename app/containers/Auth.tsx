'use client';

import useAuth from 'app/hooks/useAuth';

type TAuthProps = {
	children: React.ReactNode;
};

const Auth: React.FC<TAuthProps> = ({ children }) => {
	useAuth();

	return <>{children}</>;
};

export default Auth;

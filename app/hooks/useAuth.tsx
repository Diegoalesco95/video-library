'use client';

// @packages
import { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

// @scripts
import { AuthContext } from 'app/context/auth.context';
import { setUser, setUserError } from 'app/state/actions/auth.actions';

const PRIVATE_ROUTES = ['/', '/account'];
const PUBLIC_ROUTES = ['/login', '/signup'];

const useAuth = () => {
	const pathname = usePathname();
	const router = useRouter();
	const {
		state: { isLoading, isLoggedIn, error, user },
		dispatch,
	} = useContext(AuthContext);

	const getUserFromCookie = () => {
		const user = Cookies.get('user');
		return user ? JSON.parse(user) : null;
	};

	useEffect(() => {
		try {
			if (!user) {
				const token = Cookies.get('token');
				const userFromCookie = getUserFromCookie();

				if (token && userFromCookie) {
					setUser(dispatch, userFromCookie);
				}
			}
		} catch (error) {
			setUserError(dispatch, error);
		}
	}, [user]);

	useEffect(() => {
		if (error && !isLoading) {
			toast.error(error);
		}
	}, [error, isLoading]);

	useEffect(() => {
		if (isLoggedIn && PUBLIC_ROUTES.includes(pathname)) {
			router.replace('/');
			toast.success(`Welcome ${user?.name}`);
		} else if (!isLoggedIn && PRIVATE_ROUTES.includes(pathname)) {
			router.replace('/login');
		}
	}, [isLoggedIn, pathname]);
};

export default useAuth;

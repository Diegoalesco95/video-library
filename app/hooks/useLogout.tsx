// @packages
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

// @scripts
import { AuthContext } from 'app/context/auth.context';
import { setUser } from 'app/state/actions/auth.actions';

const useLogout = () => {
	const { dispatch } = useContext(AuthContext);

	const onLogout = () => {
		Cookies.remove('token');
		Cookies.remove('user');
		setUser(dispatch, null);
		redirect('/login');
	};

	return { onLogout };
};

export default useLogout;

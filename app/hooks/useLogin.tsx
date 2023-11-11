// @packages
import { useContext, useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import Cookies from 'js-cookie';

// @scripts
import { AuthContext } from 'app/context/auth.context';
import { setUserError, setUser, setLoadingUser } from 'app/state/actions/auth.actions';

// @types
import { IFormInputLogin, TUserResponse } from 'app/types/auth';

// @utils
const API_KEY = process.env.NEXT_PUBLIC_API_KEY_TOKEN;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const onLoginRequest = async (url: string, { arg }: { arg: IFormInputLogin }) => {
	try {
		if (!arg?.email || !arg?.password) {
			throw new Error('Please fill all fields.');
		}

		const resp = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `Basic ${btoa(`${arg?.email}:${arg?.password}`)}`,
				'content-type': 'application/json',
				'x-api-key': API_KEY,
			},
			body: JSON.stringify({
				rememberMe: arg?.rememberMe,
			}),
		});

		const data = await resp.json();

		if (resp.status === 200) {
			Cookies.set('token', data?.data?.token, { expires: arg.rememberMe ? 15 : 0.04 });
			Cookies.set('user', JSON.stringify(data?.data?.user), { expires: arg.rememberMe ? 15 : 0.04 });
		}

		return data;
	} catch (error) {
		console.log('❌', error.message);
		return error;
	}
};

const useLogin = () => {
	const { dispatch } = useContext(AuthContext);

	const {
		trigger,
		isMutating,
		data: loginResponse,
	} = useSWRMutation<TUserResponse, Error, string, IFormInputLogin>(`${API_URL}/api/auth/sign-in`, onLoginRequest);

	useEffect(() => {
		if (loginResponse && !isMutating) {
			const { data, message, statusCode } = loginResponse;

			if (statusCode !== 200) {
				setUserError(dispatch, message);
				setTimeout(() => {
					setUserError(dispatch, '');
				}, 5000);
			} else {
				setUser(dispatch, data?.user);
			}
		}
	}, [loginResponse, isMutating]);

	useEffect(() => {
		setLoadingUser(dispatch, isMutating);
	}, [isMutating]);

	return {
		onLogin: trigger,
	};
};

export default useLogin;

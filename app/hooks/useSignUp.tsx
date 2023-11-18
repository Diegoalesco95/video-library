// @packages
import { useContext, useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// @scripts
import { AuthContext } from 'app/context/auth.context';
import { setLoadingUser, setUserError } from 'app/state/actions/auth.actions';

// @types
import { IFormInputSignUp, TUserResponse } from 'app/types/auth';

// @utils
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const onSignUpRequest = async (url: string, { arg }: { arg: IFormInputSignUp }) => {
	const resp = await fetch(url, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			name: arg.name,
			email: arg.email,
			password: arg.password,
		}),
	});

	const data = await resp.json();
	return data;
};

const useSignUp = () => {
	const { dispatch } = useContext(AuthContext);
	const router = useRouter();
	const {
		trigger: onSignUp,
		data: signUpResponse,
		isMutating,
	} = useSWRMutation<TUserResponse, Error, string, IFormInputSignUp>(`${API_URL}/api/auth/sign-up`, onSignUpRequest);

	useEffect(() => {
		if (signUpResponse && !isMutating) {
			const { message, statusCode } = signUpResponse;

			if (statusCode !== 201) {
				setUserError(dispatch, message);
				setTimeout(() => {
					setUserError(dispatch, '');
				}, 5000);
			} else {
				router.push('/login');
				toast.success(message + '. Please login to continue.');
			}
		}
	}, [signUpResponse, isMutating]);

	useEffect(() => {
		setLoadingUser(dispatch, isMutating);
	}, [isMutating]);

	return {
		onSignUp,
	};
};

export default useSignUp;

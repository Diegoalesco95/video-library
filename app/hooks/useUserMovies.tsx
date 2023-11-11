// @packages
import { useContext, useEffect } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import Cookies from 'js-cookie';

// @scripts
import { setErrorUserMovies, setLoadingUserMovies, setUserMovies } from 'app/state/actions/userMovies.actions';
import { UserMoviesContext } from 'app/context/userMovies.context';
import { TUserMovieResponse, TUserMovieRequest } from 'app/types/userMovies';

// @types

// @utils
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getUserMovies = async (url: string) => {
	const token = Cookies.get('token');

	// TODO: Revisar que pasa con el token
	const resp = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	if (!resp.ok) {
		throw new Error(resp?.statusText || 'An error occurred while trying to fetch the movies.');
	}

	const data = await resp.json();
	return data;
};

const createUserMovie = async (url: string, { arg }: { arg: TUserMovieRequest }) => {
	const token = Cookies.get('token');
	const resp = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(arg),
	});

	if (!resp.ok) {
		throw new Error(resp?.statusText || 'An error occurred while trying to add the movie to the user.');
	}

	const data = await resp.json();
	return data;
};

const deleteUserMovie = async (url: string, { arg }: { arg: string }) => {
	const token = Cookies.get('token');
	const newUrl = `${url}/${arg}`;
	console.log('newUrl', newUrl);

	const resp = await fetch(newUrl, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	if (!resp.ok) {
		throw new Error(resp?.statusText || 'An error occurred while trying to add the movie to the user.');
	}

	const data = await resp.json();
	return data;
};

const useUserMovies = () => {
	const { dispatch } = useContext(UserMoviesContext);

	const { data: userMovies, isLoading: isLoadingUserMovies } = useSWR(`${API_URL}/api/user-movies`, getUserMovies, {
		onError: (error) => {
			setErrorUserMovies(dispatch, error?.message);
		},
	});

	const { isMutating: isCreatingUserMovie, trigger: onCreateUserMovie } = useSWRMutation<
		TUserMovieResponse,
		Error,
		string,
		TUserMovieRequest
	>(`${API_URL}/api/user-movies`, createUserMovie, {
		onError: (error) => {
			setErrorUserMovies(dispatch, error?.message);
		},
	});

	const { isMutating: isDeletingUserMovie, trigger: onDeleteUserMovie } = useSWRMutation<TUserMovieResponse, Error, string, string>(
		`${API_URL}/api/user-movies`,
		deleteUserMovie,
		{
			onError: (error) => {
				setErrorUserMovies(dispatch, error?.message);
			},
		},
	);

	useEffect(() => {
		if (userMovies && !isLoadingUserMovies) {
			setUserMovies(dispatch, userMovies?.data?.userMovies);
		}
	}, [userMovies, isLoadingUserMovies]);

	useEffect(() => {
		setLoadingUserMovies(dispatch, isCreatingUserMovie || isLoadingUserMovies || isDeletingUserMovie);
	}, [isCreatingUserMovie, isLoadingUserMovies, isDeletingUserMovie]);

	return {
		onCreateUserMovie,
		onDeleteUserMovie,
	};
};

export default useUserMovies;

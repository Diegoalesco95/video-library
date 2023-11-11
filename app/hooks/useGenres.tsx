// @packages
import { useContext, useEffect } from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';
// import useSWRMutation from 'swr/mutation';

// @scripts
import { GenresContext } from 'app/context/genres.context';

// @types
import { SET_GENRES, SET_ERROR_GENRES, SET_LOADING_GENRES } from 'app/state/types/index';
import { TGenreResponse } from 'app/types/genres';
import { setErrorGenres, setGenres, setLoadingGenres } from 'app/state/actions/genres.actions';
import { AuthContext } from 'app/context/auth.context';

// @utils
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getGenres = async (url: string) => {
	try {
		const token = Cookies.get('token');
		const resp = await fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await resp.json();
		return data;
	} catch (error) {
		return error;
	}
};

const useGenres = () => {
	const {
		state: { isLoggedIn },
	} = useContext(AuthContext);
	const { dispatch } = useContext(GenresContext);

	const { data, error, isLoading } = useSWR<TGenreResponse>(isLoggedIn ? `${API_URL}/api/genres` : null, getGenres);

	useEffect(() => {
		if (data && !isLoading) {
			setGenres(dispatch, data?.data?.genres);
		}
	}, [data, isLoading]);

	useEffect(() => {
		if (error && !isLoading) {
			setErrorGenres(dispatch, error.message);
		}
	}, [error, isLoading]);

	useEffect(() => {
		setLoadingGenres(dispatch, isLoading);
	}, [isLoading]);
};

export default useGenres;

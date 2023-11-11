// @packages
import { useContext, useEffect } from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

// @scripts
import { MoviesContext } from 'app/context/movies.context';
import { GenresContext } from 'app/context/genres.context';
import { setLoadingMovies, setErrorMovies, setMovies } from 'app/state/actions/movies.actions';
import { TMovieResponse } from 'app/types/movies';

// @types

// @utils
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getMovies = async (url: string) => {
	const token = Cookies.get('token');
	const resp = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!resp.ok) {
		throw new Error(resp?.statusText || 'An error occurred while trying to fetch the movies.');
	}

	const data = await resp.json();
	return data;
};

const useMovies = () => {
	const { dispatch } = useContext(MoviesContext);
	const {
		state: { selectedGenre },
	} = useContext(GenresContext);

	const { data, error, isLoading } = useSWR<TMovieResponse>(
		selectedGenre ? `${API_URL}/api/movies?genre=${selectedGenre.name}` : `${API_URL}/api/movies`,
		getMovies,
	);

	useEffect(() => {
		if (data && !isLoading) {
			setMovies(dispatch, data?.data?.movies);
		}
	}, [data, isLoading]);

	useEffect(() => {
		if (error && !isLoading) {
			setErrorMovies(dispatch, error.message);
		}
	}, [error, isLoading]);

	useEffect(() => {
		setLoadingMovies(dispatch, isLoading);
	}, [isLoading]);
};

export default useMovies;

// @packages
import { Dispatch } from 'react';

// @types
import { IMovie, TAction } from 'app/types/movies';
import { SET_MOVIES, SET_LOADING_MOVIES, SET_ERROR_MOVIES } from 'app/state/types/index';

export const setLoadingMovies = (dispatch: Dispatch<TAction>, value: boolean) => {
	dispatch({ type: SET_LOADING_MOVIES, payload: value });
};

export const setErrorMovies = (dispatch: Dispatch<TAction>, value: string) => {
	dispatch({ type: SET_ERROR_MOVIES, payload: value });
};

export const setMovies = (dispatch: Dispatch<TAction>, value: IMovie[]) => {
	dispatch({ type: SET_MOVIES, payload: value });
};

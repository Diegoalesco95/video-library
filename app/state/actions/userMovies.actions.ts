// @packages
import { Dispatch } from 'react';

// @types
import { IUserMovie, TAction } from 'app/types/userMovies';
import { SET_USER_MOVIES, SET_LOADING_USER_MOVIES, SET_ERROR_USER_MOVIES, ADD_USER_MOVIE } from 'app/state/types/index';

export const setLoadingUserMovies = (dispatch: Dispatch<TAction>, value: boolean) => {
	dispatch({ type: SET_LOADING_USER_MOVIES, payload: value });
};

export const setErrorUserMovies = (dispatch: Dispatch<TAction>, value: string) => {
	dispatch({ type: SET_ERROR_USER_MOVIES, payload: value });
};

export const setUserMovies = (dispatch: Dispatch<TAction>, value: IUserMovie[]) => {
	dispatch({ type: SET_USER_MOVIES, payload: value });
};

export const addUserMovie = (dispatch: Dispatch<TAction>, value: IUserMovie) => {
	dispatch({ type: ADD_USER_MOVIE, payload: value });
};

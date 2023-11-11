// @packages
import { Dispatch } from 'react';

// @types
import { IGenre, TAction } from 'app/types/genres';
import { SET_GENRES, SET_ERROR_GENRES, SET_LOADING_GENRES, SET_SELECTED_GENRE } from 'app/state/types/index';

export const setLoadingGenres = (dispatch: Dispatch<TAction>, value: boolean) => {
	dispatch({ type: SET_LOADING_GENRES, payload: value });
};

export const setErrorGenres = (dispatch: Dispatch<TAction>, value: string) => {
	dispatch({ type: SET_ERROR_GENRES, payload: value });
};

export const setGenres = (dispatch: Dispatch<TAction>, value: IGenre[]) => {
	dispatch({ type: SET_GENRES, payload: value });
};

export const setSelectedGenre = (dispatch: Dispatch<TAction>, value: IGenre) => {
	dispatch({ type: SET_SELECTED_GENRE, payload: value });
};

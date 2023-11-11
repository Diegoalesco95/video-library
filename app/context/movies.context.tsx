'use client';

// @packages
import { Dispatch, createContext, useReducer } from 'react';

// @types
import { IMovie, TAction, TState } from 'app/types/movies';
import { SET_MOVIES, SET_LOADING_MOVIES, SET_ERROR_MOVIES } from 'app/state/types/index';

const initialState: TState = {
	movies: [],
	isLoading: false,
	error: null,
};

const MoviesReducer = (state: TState, action: TAction) => {
	switch (action.type) {
		case SET_LOADING_MOVIES:
			return { ...state, isLoading: action.payload as boolean };
		case SET_ERROR_MOVIES:
			return { ...state, error: action.payload as string, isLoading: false };
		case SET_MOVIES:
			return { ...state, movies: [...(action.payload as IMovie[])], error: null, isLoading: false };

		default:
			return state;
	}
};

export const MoviesContext = createContext<{ state: TState; dispatch: Dispatch<TAction> }>({
	state: initialState,
	dispatch: () => null,
});

export const MoviesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(MoviesReducer, initialState);

	return <MoviesContext.Provider value={{ state, dispatch }}>{children}</MoviesContext.Provider>;
};

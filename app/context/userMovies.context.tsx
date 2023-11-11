'use client';

// @packages
import { Dispatch, createContext, useReducer } from 'react';

// @types
import { IUserMovie, TAction, TState } from 'app/types/userMovies';
import { SET_USER_MOVIES, SET_LOADING_USER_MOVIES, SET_ERROR_USER_MOVIES, ADD_USER_MOVIE } from 'app/state/types/index';

const initialState: TState = {
	userMovies: [],
	isLoading: false,
	error: null,
};

const UserMoviesReducer = (state: TState, action: TAction) => {
	switch (action.type) {
		case SET_LOADING_USER_MOVIES:
			return { ...state, isLoading: action.payload as boolean };
		case SET_ERROR_USER_MOVIES:
			return { ...state, error: action.payload as string, isLoading: false };
		case SET_USER_MOVIES:
			return { ...state, userMovies: [...(action.payload as IUserMovie[])], error: null, isLoading: false };
		case ADD_USER_MOVIE:
			return { ...state, userMovies: [...state.userMovies, action.payload as IUserMovie], error: null, isLoading: false };
		default:
			return state;
	}
};

export const UserMoviesContext = createContext<{ state: TState; dispatch: Dispatch<TAction> }>({
	state: initialState,
	dispatch: () => null,
});

export const UserMoviesProvider = ({ children }) => {
	const [state, dispatch] = useReducer(UserMoviesReducer, initialState);

	return <UserMoviesContext.Provider value={{ state, dispatch }}>{children}</UserMoviesContext.Provider>;
};

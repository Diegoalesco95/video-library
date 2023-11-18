'use client';

// @packages
import { Dispatch, createContext, useReducer } from 'react';

// @types
import { IGenre, TAction, TState } from 'app/types/genres';
import { SET_GENRES, SET_ERROR_GENRES, SET_LOADING_GENRES, SET_SELECTED_GENRE } from 'app/state/types/index';

const initialState: TState = {
	genres: [],
	isLoading: false,
	error: null,
	selectedGenre: null,
};

const GenresReducer = (state: TState, action: TAction) => {
	switch (action.type) {
		case SET_LOADING_GENRES:
			return { ...state, isLoading: action.payload as boolean };
		case SET_ERROR_GENRES:
			return { ...state, error: action.payload as string, isLoading: false };
		case SET_GENRES:
			return { ...state, genres: [...(action.payload as IGenre[])], error: null, isLoading: false };
		case SET_SELECTED_GENRE:
			return { ...state, selectedGenre: action.payload as IGenre };
		default:
			return state;
	}
};

export const GenresContext = createContext<{ state: TState; dispatch: Dispatch<TAction> }>({
	state: initialState,
	dispatch: () => null,
});

export const GenresProvider = ({ children }) => {
	const [state, dispatch] = useReducer(GenresReducer, initialState);

	return <GenresContext.Provider value={{ state, dispatch }}>{children}</GenresContext.Provider>;
};

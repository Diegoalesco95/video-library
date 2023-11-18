'use client';
// @packages
import { Dispatch, createContext, useReducer } from 'react';

// @types
import { TAction, TState, TUser } from 'app/types/auth';
import { SET_ERROR_USER, SET_LOADING_USER, SET_USER } from 'app/state/types';

const initialState: TState = {
	error: '',
	isLoading: false,
	isLoggedIn: false,
	user: null,
};

const AuthReducer = (state: TState, action: TAction) => {
	switch (action.type) {
		case SET_LOADING_USER:
			return { ...state, isLoading: action.payload as boolean };
		case SET_ERROR_USER:
			return { ...state, error: action.payload as string, isLoading: false };
		case SET_USER:
			return { ...state, user: action.payload as TUser, isLoggedIn: true, error: '', isLoading: false };
		default:
			return state;
	}
};

export const AuthContext = createContext<{
	state: TState;
	dispatch: Dispatch<TAction>;
}>({
	state: initialState,
	dispatch: () => null,
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, initialState);

	return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

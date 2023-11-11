// @packages
import { Dispatch } from 'react';

// @scripts
import { SET_ERROR_USER, SET_LOADING_USER, SET_USER } from 'app/state/types';

// @types
import { TUser } from 'app/types/auth';

type TAuthAction = {
	type: string;
	payload: string | boolean | TUser;
};

export const setLoadingUser = (dispatch: Dispatch<TAuthAction>, value: boolean) => {
	dispatch({ type: SET_LOADING_USER, payload: value });
};

export const setUserError = (dispatch: Dispatch<TAuthAction>, value: string) => {
	dispatch({ type: SET_ERROR_USER, payload: value });
};

export const setUser = (dispatch: Dispatch<TAuthAction>, value: TUser) => {
	dispatch({ type: SET_USER, payload: value });
};

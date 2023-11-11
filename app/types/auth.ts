export type TUser = {
	id: string;
	name: string;
	email: string;
};

export interface IFormInput {
	email: string;
	password: string;
}

export interface IFormInputLogin extends IFormInput {
	rememberMe: boolean;
}

export interface IFormInputSignUp extends IFormInput {
	name: string;
	passwordConfirmation: string;
}

export type TUserResponse = {
	data?: {
		token: string;
		user: TUser;
	};
	error?: string;
	message?: string;
	stack?: string;
	statusCode?: number;
};

export type TState = {
	error: string;
	isLoading: boolean;
	isLoggedIn: boolean;
	user: TUser | null;
};

export type TAction = {
	type: string;
	payload: TUser | string | boolean;
};

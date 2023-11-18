export interface IUserMovie {
	_id: string;
	userId: string;
	movieId: string;
}

export type TState = {
	userMovies: IUserMovie[];
	isLoading: boolean;
	error: string;
};

export type TAction = {
	type: string;
	payload: IUserMovie | IUserMovie[] | string | boolean | number;
};

export type TUserMovieRequest = {
	userId: string;
	movieId?: string;
};

export type TUserMovieResponse = {
	data?: {
		deletedUserMovieId?: string;
		userMovie?: IUserMovie;
		userMovies?: IUserMovie[];
		updatedUserMovieId?: string;
	};
	error?: string;
	message?: string;
	stack?: string;
	statusCode?: number;
};

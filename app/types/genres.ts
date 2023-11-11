export interface IGenre {
	_id: string;
	id: number;
	name: string;
}

export type TState = {
	genres: IGenre[];
	isLoading: boolean;
	error: string;
	selectedGenre: IGenre | null;
};

export type TAction = {
	type: string;
	payload: IGenre | IGenre[] | string | boolean | number;
};

export type TGenreResponse = {
	data?: {
		deletedGenre?: string;
		genre?: IGenre;
		genres?: IGenre[];
		newGenreId?: string;
		updatedGenreId?: string;
	};
	error?: string;
	message?: string;
	stack?: string;
	statusCode?: number;
};

export enum OriginalLanguage {
	En = 'en',
	Hi = 'hi',
}
export interface IMovie {
	_id: string;
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: OriginalLanguage;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export type TState = {
	movies: IMovie[];
	isLoading: boolean;
	error: string;
};

export type TAction = {
	type: string;
	payload: IMovie[] | string | boolean | number;
};

export type TMovieResponse = {
	data?: {
		deletedMovie?: string;
		movie?: IMovie;
		movies?: IMovie[];
		newMovieId?: string;
		updatedMovieId?: string;
	};
	error?: string;
	message?: string;
	stack?: string;
	statusCode?: number;
};

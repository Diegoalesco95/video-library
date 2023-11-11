'use client';

// @components
import Movie from 'app/components/Movie';
import { MovieLoader } from 'app/components/Loader';

// @styles
import styles from 'app/styles/components/movies.module.scss';

// @types
import { IMovie } from 'app/types/movies';

interface IMoviesProps {
	title?: string;
	movies: IMovie[];
	isLoading?: boolean;
}

const Movies: React.FC<IMoviesProps> = ({ isLoading, movies, title }) => {
	return (
		<section className={styles.movies}>
			{title ? <h1 className={styles.movies__title}>{title}</h1> : null}
			<div className={styles.movies__container}>
				{isLoading ? <MovieLoader quantity={7} /> : null}
				{movies.length > 0 ? (
					movies.map((movie) => <Movie key={movie._id} movie={movie} />)
				) : (
					<p className={styles.movies__message}>No movies found</p>
				)}
			</div>
		</section>
	);
};

export default Movies;

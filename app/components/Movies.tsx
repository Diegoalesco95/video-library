'use client';

// @components
import Movie from 'app/components/Movie';

// @styles
import styles from 'app/styles/components/movies.module.scss';

// @types
import { IMovie } from 'app/types/movies';

interface IMoviesProps {
	title?: string;
	movies: IMovie[];
}

const Movies: React.FC<IMoviesProps> = ({ title, movies }) => {
	return (
		<section className={styles.movies}>
			{title ? <h1 className={styles.movies__title}>{title}</h1> : null}
			<div className={styles.movies__container}>
				{movies.length > 0 ? movies.map((movie) => <Movie key={movie._id} movie={movie} />) : <p>No movies found</p>}
			</div>
		</section>
	);
};

export default Movies;

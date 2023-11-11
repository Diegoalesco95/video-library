'use client';

// @packages
import { useContext } from 'react';
import Image from 'next/image';
import { MdPlaylistAdd, MdPlaylistRemove } from 'react-icons/md';

// @scripts
import { AuthContext } from 'app/context/auth.context';
import useUserMovies from 'app/hooks/useUserMovies';

// @styles
import styles from 'app/styles/components/movie.module.scss';

// @types
import { IMovie } from 'app/types/movies';
import { UserMoviesContext } from 'app/context/userMovies.context';

interface IMovieProps {
	movie: IMovie;
}

const Movie: React.FC<IMovieProps> = (props) => {
	const { movie } = props;

	const {
		state: {
			user: { id },
		},
	} = useContext(AuthContext);

	const {
		state: { userMovies },
	} = useContext(UserMoviesContext);

	const { onCreateUserMovie, onDeleteUserMovie } = useUserMovies();

	const image = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
	const voteAverage = movie.vote_average * 10;
	const isFavorite = userMovies.find((userMovie) => userMovie.movieId === movie._id);

	const handleSetFavorite = () => {
		onCreateUserMovie({
			movieId: movie._id,
			userId: id,
		});
	};

	const handleDeleteFavorite = () => {
		onDeleteUserMovie(isFavorite._id);
	};

	return (
		<div className={styles['movie']}>
			<Image className={styles['movie__img']} width={200} height={250} src={image} alt={movie.title} priority />
			<div className={styles['movie__details']}>
				<h2 className={styles['movie__title']}>{movie.title}</h2>
				<div className={styles['movie__release']}>
					<span>{movie?.release_date}</span>
				</div>
				<div
					className={styles['movie__vote-average']}
					style={{
						background: `radial-gradient(closest-side, #000 79%, transparent 80% 100%), conic-gradient(#F806CC ${voteAverage}%, #ffffff80 0)`,
					}}>
					<progress value={voteAverage} max='100' className={styles['movie__vote-average--progress']}></progress>
					<span>{voteAverage}%</span>
				</div>
				<div className={styles['movie__details--icon']}>
					{isFavorite ? (
						<MdPlaylistRemove className={styles.remove} title='Delete from list' onClick={handleDeleteFavorite} />
					) : (
						<MdPlaylistAdd className={styles.add} title='Add to list' onClick={handleSetFavorite} />
					)}
				</div>
			</div>
		</div>
	);
};

export default Movie;

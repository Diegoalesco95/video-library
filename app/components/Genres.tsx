'use client';

// @packages
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

// @components
import Genre from 'app/components/Genre';
import { GenreLoader } from 'app/components/Loader';

// @scripts
import { GenresContext } from 'app/context/genres.context';
import useGenres from 'app/hooks/useGenres';

// @styles
import styles from 'app/styles/components/genres.module.scss';

const isThereGenres = (genres: {}) => {
	return Object.keys(genres).length > 0;
};

const Genres = () => {
	useGenres();
	const {
		state: { genres, error, isLoading },
	} = useContext(GenresContext);

	useEffect(() => {
		if (error && !isLoading) {
			toast.error(error);
		}
	}, [error, isLoading]);

	return (
		<section className={styles.genres}>
			<h2 className={styles.title}>Categories</h2>
			{
				<div className={styles.container}>
					{isLoading && <GenreLoader quantity={4} />}
					{isThereGenres(genres) && genres.map((genre) => <Genre key={genre?.id} genre={genre} />)}
				</div>
			}
		</section>
	);
};

export default Genres;

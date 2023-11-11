'use client';

// @packages
import { useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

// @components
import Genre from 'app/components/Genre';

// @scripts
import { GenresContext } from 'app/context/genres.context';
import useGenres from 'app/hooks/useGenres';

// @styles
import styles from 'app/styles/components/genres.module.scss';

// @types
import { IGenre } from 'app/types/genres';

const isThereGenres = (genres: {}) => {
	return Object.keys(genres).length > 0;
};

const listGenres = (genres: IGenre[]) => {
	if (isThereGenres(genres)) {
		return (
			<div className={styles.container}>
				{genres.map((genre) => (
					<Genre key={genre?.id} genre={genre} />
				))}
			</div>
		);
	}

	return null;
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
			{listGenres(genres)}
		</section>
	);
};

export default Genres;

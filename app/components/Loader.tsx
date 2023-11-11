import styles from 'app/styles/components/loader.module.scss';
import Genre from './Genre';

type TloaderProps = {
	quantity?: number;
};

export const GenreLoader: React.FC<TloaderProps> = ({ quantity = 1 }) => (
	<>
		{Array.from(Array(quantity).keys()).map((_, index) => (
			<div key={index} className={styles.genre}>
				<div className={styles['genre__title']} />
			</div>
		))}
	</>
);

export const MovieLoader: React.FC<TloaderProps> = ({ quantity = 1 }) => (
	<>
		{Array.from(Array(quantity).keys()).map((_, index) => (
			<div key={index} className={styles.movie}>
				<div className={styles['movie__image']} />
				<div className={styles['movie__details']}>
					<div className={styles['movie__title']} />
					<div className={styles['movie__release']} />
				</div>
			</div>
		))}
	</>
);

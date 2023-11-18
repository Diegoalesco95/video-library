// @styles
import { GenresContext } from 'app/context/genres.context';
import { setSelectedGenre } from 'app/state/actions/genres.actions';
import styles from 'app/styles/components/genre.module.scss';
import { useContext } from 'react';
import clsx from 'clsx';
import { IGenre } from 'app/types/genres';

// @types
interface IGenreProps {
	genre: IGenre;
}

const Genre: React.FC<IGenreProps> = ({ genre }) => {
	const {
		dispatch,
		state: { selectedGenre },
	} = useContext(GenresContext);

	const handleClick = () => {
		if (selectedGenre?.id === genre.id) {
			setSelectedGenre(dispatch, null);
		} else {
			setSelectedGenre(dispatch, genre);
		}
	};

	return (
		<article className={clsx(styles.genre, { [styles.selected]: selectedGenre?.id === genre.id })} onClick={handleClick}>
			<span>{genre.name}</span>
		</article>
	);
};

export default Genre;

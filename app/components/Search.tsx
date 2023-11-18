// @styles
import styles from 'app/styles/components/searchbar.module.scss';

type TSearchProps = {
	handleFilter: (name: string) => void;
};

const Search: React.FC<TSearchProps> = ({ handleFilter }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		handleFilter(event.target.value);
	};

	return (
		<section className={styles.searchbar}>
			<h2 className={styles.searchbar__title}>What do you want to watch today?</h2>
			<input className={styles.searchbar__input} type='text' placeholder='Search a movie...' onChange={handleChange} />
		</section>
	);
};

export default Search;

// @styles
import styles from 'app/styles/components/searchbar.module.scss';

const Search = () => (
	<section className={styles.main}>
		<h2 className={styles.main__title}>What do you want to watch today?</h2>
		<input className={styles.input} type='text' placeholder='Search...' />
	</section>
);

export default Search;

// @packages
import Link from 'next/link';

import styles from 'app/styles/views/not-found.module.scss';

const NotFound = () => (
	<section className={styles['not-found']}>
		<p className={styles['not-found__number']}>404</p>
		<p className={styles['not-found__text']}>We're sorry, the page you requested could not be found. Please go back to the homepage.</p>
		<Link href='/'>
			<button type='button' className={styles['not-found__button']}>
				Back to Home
			</button>
		</Link>
	</section>
);

export default NotFound;

// @packages
import type { Metadata } from 'next';

// scripts
import { GenresProvider } from 'app/context/genres.context';
import { MoviesProvider } from 'app/context/movies.context';

// @components
import Auth from 'app/containers/Auth';
import Account from 'app/containers/Account';

export const metadata: Metadata = {
	title: 'Account',
};

const HomePage = () => {
	return (
		<Auth>
			<GenresProvider>
				<MoviesProvider>
					<Account />
				</MoviesProvider>
			</GenresProvider>
		</Auth>
	);
};

export default HomePage;

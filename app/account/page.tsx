'use client';
// scripts
import { GenresProvider } from 'app/context/genres.context';
import { MoviesProvider } from 'app/context/movies.context';
import useAuth from 'app/hooks/useAuth';

// @components
import Account from 'app/containers/Account';

const HomePage = () => {
	useAuth();

	return (
		<GenresProvider>
			<MoviesProvider>
				<Account />
			</MoviesProvider>
		</GenresProvider>
	);
};

export default HomePage;

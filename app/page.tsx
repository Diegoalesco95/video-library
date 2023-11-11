'use client';
// scripts
import { GenresProvider } from 'app/context/genres.context';
import { MoviesProvider } from 'app/context/movies.context';
import useAuth from 'app/hooks/useAuth';

// @components
import Home from 'app/containers/Home';

const HomePage = () => {
	useAuth();

	return (
		<GenresProvider>
			<MoviesProvider>
				<Home />
			</MoviesProvider>
		</GenresProvider>
	);
};

export default HomePage;

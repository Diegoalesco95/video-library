// @packages
import type { Metadata } from 'next';

// scripts
import { GenresProvider } from 'app/context/genres.context';
import { MoviesProvider } from 'app/context/movies.context';

// @components
import Auth from 'app/containers/Auth';
import Home from 'app/containers/Home';

export const metadata: Metadata = {
	title: 'Home',
};

const HomePage = () => {
	return (
		<Auth>
			<GenresProvider>
				<MoviesProvider>
					<Home />
				</MoviesProvider>
			</GenresProvider>
		</Auth>
	);
};

export default HomePage;

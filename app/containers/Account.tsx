// @packages
import { useContext, useState, useEffect } from 'react';

// scripts
import { MoviesContext } from 'app/context/movies.context';
import { UserMoviesContext } from 'app/context/userMovies.context';
import useMovies from 'app/hooks/useMovies';

// @components
import Footer from 'app/components/Footer';
import Header from 'app/components/Header';
import Movies from 'app/components/Movies';

// @types
import { IMovie } from 'app/types/movies';

const Account = () => {
	useMovies();
	const {
		state: { movies },
	} = useContext(MoviesContext);

	const {
		state: { userMovies },
	} = useContext(UserMoviesContext);

	const [favoriteMovies, setFavoriteMovies] = useState<IMovie[]>([]);

	useEffect(() => {
		if (userMovies.length > 0) {
			const moviesByFavorite = movies.filter((movie) => userMovies.find((userMovie) => userMovie.movieId === movie._id));

			setFavoriteMovies(moviesByFavorite);
		} else {
			setFavoriteMovies([]);
		}
	}, [userMovies, movies]);

	return (
		<>
			<Header />
			<Movies movies={favoriteMovies} title='Your favorite movies' />
			<Footer />
		</>
	);
};

export default Account;

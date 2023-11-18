'use client';

// @packages
import { useContext, useEffect, useState } from 'react';

// @components
import Footer from 'app/components/Footer';
import Genres from 'app/components/Genres';
import Header from 'app/components/Header';
import Movies from 'app/components/Movies';
import Search from 'app/components/Search';

// @scripts
import { GenresContext } from 'app/context/genres.context';
import { MoviesContext } from 'app/context/movies.context';
import useMovies from 'app/hooks/useMovies';

const Home = () => {
	useMovies();

	const {
		state: { selectedGenre },
	} = useContext(GenresContext);

	const {
		state: { movies, isLoading },
	} = useContext(MoviesContext);

	const [filteredMovies, setFilteredMovies] = useState(movies);

	useEffect(() => {
		setFilteredMovies(movies);
	}, [movies]);

	const handleFilterMovies = (name: string) => {
		const filtered = movies.filter((movie) => movie.title.toLowerCase().includes(name.toLowerCase()));
		setFilteredMovies(filtered);
	};

	return (
		<>
			<Header />
			<Search handleFilter={handleFilterMovies} />
			<Genres />
			<Movies isLoading={isLoading} movies={filteredMovies} title={`Movies ${selectedGenre?.name ? `- ${selectedGenre?.name}` : ''}`} />
			<Footer />
		</>
	);
};

export default Home;

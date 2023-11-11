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
		state: { movies },
	} = useContext(MoviesContext);

	return (
		<>
			<Header />
			<Search />
			<Genres />
			<Movies movies={movies} title={`Movies ${selectedGenre?.name ? `- ${selectedGenre?.name}` : ''}`} />
			<Footer />
		</>
	);
};

export default Home;

'use client';
import { useContext } from 'react';

import Header from './components/Header';
import Search from './components/Search';
import Categories from './components/Categories';

import { AuthContext } from './lib/hooks/useAuth';
import { CategoriesContext } from './lib/hooks/useCategories';
import Footer from './components/Footer';

const Home = () => {
	const currentUser = useContext(AuthContext);
	const categories = useContext(CategoriesContext);

	return (
		<AuthContext.Provider value={currentUser}>
			<Header />
			<Search />
			<CategoriesContext.Provider value={categories}>
				<Categories />
			</CategoriesContext.Provider>
			<Footer />
		</AuthContext.Provider>
	);
};

export default Home;

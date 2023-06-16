'use client';

import React, { useContext } from 'react';
import { CategoriesContext } from 'app/lib/hooks/useCategories';
import styles from 'app/styles/components/categories.module.scss';

import Carousel from './Carousel';
import CarouselItem from './CarouselItem';

const listCategories = ({ categories }) => {
	return Object.keys(categories).map((category) => {
		return (
			<div key={`category-${category}`}>
				<h2 className={styles.categories__title}>{category}</h2>
				<Carousel>
					{categories[category].map((item) => (
						<CarouselItem key={`item-${item.id}`} {...item} />
					))}
				</Carousel>
			</div>
		);
	});
};

const Categories = () => {
	const categories = useContext(CategoriesContext);
	return <div className={styles.categories}>{listCategories(categories)}</div>;
};

export default Categories;

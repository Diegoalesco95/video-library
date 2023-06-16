'use client';

import React from 'react';
import styles from 'app/styles/components/carousel.module.scss';

const Carousel = ({ children }) => (
	<section className={styles.carousel}>
		<div className={styles.carousel__container}>
			{children}
		</div>
	</section>
);

export default Carousel;

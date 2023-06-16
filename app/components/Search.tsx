'use client'

import React from 'react';
import styles from 'app/styles/components/searchbar.module.scss';

const Search = () => (
	<section className={styles.main}>
		<h2 className={styles.main__title}>¿Qué quieres ver hoy?</h2>
		<input className={styles.input} type='text' placeholder='Buscar...' />
	</section>
);

export default Search;

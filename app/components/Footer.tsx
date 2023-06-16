import React from 'react';

import styles from 'app/styles/layout/footer.module.scss';

const Footer = () => (
	<footer className={styles.footer}>
		<a href='/'>Términos de uso</a>
		<a href='/'>Declaración de privacidad</a>
		<a href='/'>Centro de ayuda</a>
	</footer>
);

export default Footer;

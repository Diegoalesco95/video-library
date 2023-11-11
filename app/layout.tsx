// @scripts
import Providers from 'app/containers/Providers';

// @styles
import styles from 'app/styles/base/globals.module.scss';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en'>
			<head>
				<link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
				<link rel='manifest' href='/favicon/site.webmanifest' />
			</head>
			<body className={styles.body}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;

import * as React from 'react';
// import Footer from './Footer';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
	const { children } = props;

	return (
		<div className='App'>
			{children}
			{/* <Footer /> */}
		</div>
	);
};

export default Layout;

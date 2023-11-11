import * as React from 'react';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
	const { children } = props;

	return <div className='App'>{children}</div>;
};

export default Layout;

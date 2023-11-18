'use client';

// @packages
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

// @scripts
import { AuthContext } from 'app/context/auth.context';
import useLogout from 'app/hooks/useLogout';
import gravatar from 'app/utils/gravatar';

// @styles
import styles from 'app/styles/layout/header.module.scss';

const Header = () => {
	const {
		state: { isLoggedIn, user },
	} = useContext(AuthContext);
	const { onLogout } = useLogout();

	const handleLogout = () => {
		onLogout();
	};

	return (
		<header className={clsx(styles.header)}>
			<Link href='/'>
				<span className={styles.header__logo}>Video Library</span>
			</Link>
			<div className={styles.header__menu}>
				<div className={styles['header__menu--profile']}>
					{isLoggedIn && user ? (
						<>
							<Image className={styles['header__menu--gravatar']} src={gravatar(user.email)} width={50} height={50} alt={user.email} />
							<p>{user.name}</p>
						</>
					) : (
						<>
							<Image src='/img/profile-2.png' width={50} height={50} alt='user Icon' />
							<p>Menu</p>
						</>
					)}
				</div>
				<ul>
					{isLoggedIn ? (
						<li>
							<Link href='/account'>Account</Link>
						</li>
					) : null}
					{isLoggedIn ? (
						<li>
							<Link href='/login' onClick={handleLogout}>
								Logout
							</Link>
						</li>
					) : (
						<>
							<li>
								<Link href='/login'>Login</Link>
							</li>
							<li>
								<Link href='/signup'>Sign up</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</header>
	);
};

export default Header;

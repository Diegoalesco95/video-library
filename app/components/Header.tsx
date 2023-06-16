'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { AuthContext } from 'app/lib/hooks/useAuth';
import gravatar from 'app/utils/gravatar';
import styles from 'app/styles/layout/header.module.scss';
import clsx from 'clsx';

const Header = () => {
	const currentUser = useContext(AuthContext);

	const handleLogout = () => {
		return null;
	};

	return (
		<header className={clsx(styles.header)}>
			<Link href='/'>
				<span className={styles.header__logo}>Video Library</span>
			</Link>
			<div className={styles.header__menu}>
				<div className={styles['header__menu--profile']}>
					{currentUser.isLogin ? (
						<>
							<Image
								className={styles['header__menu--gravatar']}
								src={gravatar(currentUser.user.email)}
								width={50}
								height={50}
								alt={currentUser.user.email}
							/>
							<p>{currentUser.user.name}</p>
						</>
					) : (
						<>
							<Image src='/img/profile-2.png' width={50} height={50} alt='user Icon' />
							<p>Menu</p>
						</>
					)}
				</div>
				<ul>
					{currentUser.isLogin ? (
						<li>
							<Link href='/'>Ver Pefil</Link>
						</li>
					) : null}
					{currentUser.isLogin ? (
						<li>
							<Link href='/login' onClick={handleLogout}>
								Cerrar Sesión
							</Link>
						</li>
					) : (
						<>
							<li>
								<Link href='/login'>Iniciar Sesión</Link>
							</li>
							<li>
								<Link href='/signUp'>Registrarse</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</header>
	);
};

export default Header;

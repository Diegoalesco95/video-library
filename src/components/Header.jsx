import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/static/logo-platzi-video.png';
import userIcon from '../assets/static/profile-2.png';

const Header = () => (
  <header className='header'>
    <Link to='/'>
      <img className='header__img' src={Logo} alt='Logo Platzi Video' />
    </Link>
    <div className='header__menu'>
      <div className='header__menu--profile'>
        <img src={userIcon} alt='' />
        <p>Perfil</p>
      </div>
      <ul>
        <li>
          <Link to='/'>Cuenta</Link>
        </li>
        <li>
          <Link to='/login'>Iniciar Sesión</Link>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;

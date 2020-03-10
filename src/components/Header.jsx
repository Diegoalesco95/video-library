import React from 'react';

import Logo from '../assets/static/logo-platzi-video.png';
import userIcon from '../assets/static/profile-2.png';

const Header = () => (
  <header className='header'>
    <img
      // tabindex="0"
      className='header__img'
      src={Logo}
      alt='Logo Platzi Video'
    />
    <div className='header__menu'>
      <div className='header__menu--profile'>
        <img src={userIcon} alt='' />
        <p>Perfil</p>
      </div>
      <ul>
        <li>
          <a href='/'>Cuenta</a>
        </li>
        <li>
          <a href='/'>Cerrar Sesión</a>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;

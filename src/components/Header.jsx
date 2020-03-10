import React from 'react';
import '../assets/scss/index.scss';

const Header = () => (
  <header className='header'>
    <img
      // tabindex="0"
      className='header__img'
      src='../src/assets/images/logo-platzi-video.png'
      alt='Logo Platzi Video'
    />
    <div className='header__menu'>
      <div className='header__menu--profile'>
        <img src='../src/assets/images/profile-2.png' alt='' />
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

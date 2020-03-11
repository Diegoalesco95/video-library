import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import gravatar from '../utils/gravatar';

import Logo from '../assets/static/logo-platzi-video.png';
import userIcon from '../assets/static/profile-2.png';

const Header = (props) => {
  const { user } = props;
  const hasUser = Object.keys(user).length > 0;
  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__img' src={Logo} alt='Logo Platzi Video' />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          {hasUser ? (
            <img
              className='header__menu--gravatar'
              src={gravatar(user.email)}
              alt={user.email}
            />
          ) : (
            <img src={userIcon} alt='user Icon' />
          )}
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
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Header);

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import gravatar from '../utils/gravatar';
import { logoutRequest } from '../actions';

import Logo from '../assets/static/logo-platzi-video.png';
import userIcon from '../assets/static/profile-2.png';

const Header = (props) => {
  const { user } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    props.logoutRequest({});
  };
  return (
    <header className='header'>
      <Link to='/'>
        <img className='header__img' src={Logo} alt='Logo Platzi Video' />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          {hasUser ? (
            <>
              <img
                className='header__menu--gravatar'
                src={gravatar(user.email)}
                alt={user.email}
              />
              <p>{user.name}</p>
            </>
          ) : (
            <>
              <img src={userIcon} alt='user Icon' />
              <p>Menu</p>
            </>
          )}
        </div>
        <ul>
          {hasUser ? (
            <li>
              <Link to='/'>Ver Pefil</Link>
            </li>
          ) : null}
          {hasUser ? (
            <li>
              <Link to='/login' onClick={handleLogout}>
                Cerrar Sesión
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to='/login'>Iniciar Sesión</Link>
              </li>
              <li>
                <Link to='/signUp'>Registrarse</Link>
              </li>
            </>
          )}
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

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

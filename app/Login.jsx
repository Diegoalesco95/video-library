import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../actions/index';
import Header from '../components/Header';
import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';
import facebookIcon from '../assets/static/facebook.png';

import '../assets/styles/App.scss';

const Login = (props) => {
  const [form, setForm] = useState({
    email: '',
    id: '',
    name: '',
    rememberMe: false,
  });

  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginUser(form, '/');
  };

  return (
    <>
      <Header isLogin />
      <section className='login'>
        <section className='login__container'>
          <h2>Inicia Sesión</h2>
          <form className='login__container--form' onSubmit={handleSubmit}>
            <input
              name='email'
              aria-label='Correo'
              type='email'
              id='email'
              className='input--login'
              placeholder='Correo'
              onChange={handleInput}
              required
            />
            <input
              name='password'
              aria-label='Contraseña'
              type='password'
              id='password'
              className='input--login'
              placeholder='Contraseña'
              onChange={handleInput}
              required
            />
            <button className='button' type='submit'>
              Iniciar Sesión
            </button>
            <div className='login__container--remember-me'>
              <label htmlFor='cbox1'>
                <input name='rememberMe' type='checkbox' id='cbox1' value='true' onClick={handleInput} />
                Recuérdame
              </label>
              <a href='/'>Olvidé mi contraseña</a>
            </div>
          </form>
          <section className='login__container--social-media'>
            <div className='google'>
              <img className='google__img' src={googleIcon} alt='Google' />
              <p>
                <a href='/auth/google/'>Inicia sesión con Google</a>
              </p>
            </div>
            <div className='twitter'>
              <img className='twitter__img' src={twitterIcon} alt='Twitter' />
              <p>
                <a href='/auth/twitter'>Inicia sesión con Twitter</a>
              </p>
            </div>
            <div className='facebook'>
              <img className='facebook__img' src={facebookIcon} alt='FacebookIcon' />
              <p>
                <a href='/auth/facebook'>Inicia sesión con Facebook</a>
              </p>
            </div>
          </section>
          <p className='login__container--register'>
            ¿No tienes ninguna cuenta?
            <br />
            <Link to='/signup'>Regístrate!</Link>
          </p>
        </section>
      </section>
    </>
  );
};

const mapDispacthToProps = {
  loginUser,
};

Login.propTypes = {
  loginUser: PropTypes.func,
};

export default connect(null, mapDispacthToProps)(Login);

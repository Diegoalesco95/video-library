import React from 'react';
import { Link } from 'react-router-dom';
import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';

import '../assets/styles/App.scss';

const Login = () => (
  <section className='login'>
    <section className='login__container'>
      <h2>Inicia Sesión</h2>
      <form className='login__container--form'>
        <input
          aria-label='Correo'
          type='email'
          name=''
          id=''
          className='input--login'
          placeholder='Correo'
        />
        <input
          aria-label='Contraseña'
          type='password'
          name=''
          id=''
          className='input--login'
          placeholder='Contraseña'
        />
        <button className='button' type='button'>
          Iniciar Sesión
        </button>
        <div className='login__container--remember-me'>
          <label htmlFor='cbox1'>
            <input type='checkbox' id='cbox1' value='checkbox' />
            Recuérdame
          </label>
          <a href='/'>Olvidé mi contraseña</a>
        </div>
      </form>
      <section className='login__container--social-media'>
        <div className='google'>
          <img className='google__img' src={googleIcon} alt='Google' />
          <p>
            <a href='/'>Inicia sesión con Google</a>
          </p>
        </div>
        <div className='twitter'>
          <img className='twitter__img' src={twitterIcon} alt='Twitter' />
          <p>
            <a href='/'>Inicia sesión con Twitter</a>
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
);

export default Login;

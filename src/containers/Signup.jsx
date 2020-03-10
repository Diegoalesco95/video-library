import React from 'react';
import { Link } from 'react-router-dom';
import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';

import '../assets/styles/App.scss';

const Signup = () => (
  <section className='register'>
    <section className='register__container'>
      <h2>Regístrate</h2>
      <form className='register__container--form'>
        <input
          aria-label='Nombre'
          type='text'
          name='Nombre'
          id='name'
          className='input--signup'
          placeholder='Nombre'
        />
        <input
          aria-label='Correo'
          type='email'
          name='Correo'
          id='email'
          className='input--signup'
          placeholder='Correo'
        />
        <input
          aria-label='Contraseña'
          type='password'
          name='Contraseña'
          id='password'
          className='input--signup'
          placeholder='Contraseña'
        />
        <input
          aria-label='Confirmar contraseña'
          type='password'
          name='Confirmar contraseña'
          id='confirm-password'
          className='input--signup'
          placeholder='Confirmar contraseña'
        />
        <button type='button' className='button'>
          Registrarme
        </button>
      </form>
      <section className='register__container--social-media'>
        <div className='google'>
          <img className='google__img' src={googleIcon} alt='Google' />
          <p>
            <a href='/'>Registro con Google </a>
          </p>
        </div>
        <div className='twitter'>
          <img className='twitter__img' src={twitterIcon} alt='Twitter' />
          <p>
            <a href='/'>Registro con Twitter</a>
          </p>
        </div>
      </section>
      <p className='register__container--login'>
        ¿Ya tienes una cuenta?
        <br />
        <Link to='/login'>Inicia sesión</Link>
      </p>
    </section>
  </section>
);

export default Signup;

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';
import { loginRequest } from '../actions';

import '../assets/styles/App.scss';

const Login = (props) => {
  const [form, setValues] = useState({
    email: '',
  });

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginRequest(form);
    props.history.push('/');
  };

  return (
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
          />
          <input
            name='password'
            aria-label='Contraseña'
            type='password'
            id='password'
            className='input--login'
            placeholder='Contraseña'
            onChange={handleInput}
          />
          <button className='button' type='submit'>
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
};

const mapDispacthToProps = {
  loginRequest,
};

export default connect(null, mapDispacthToProps)(Login);

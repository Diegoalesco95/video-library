import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUpUser } from '../actions';
import Header from '../components/Header';

import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';

import '../assets/styles/App.scss';

const Signup = (props) => {
  const [form, setValues] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signUpUser(form, '/login');
  };

  return (
    <>
      <Header isSignUp />
      <section className='register'>
        <section className='register__container'>
          <h2>Regístrate</h2>
          <form className='register__container--form' onSubmit={handleSubmit}>
            <input
              name='name'
              aria-label='Nombre'
              type='text'
              id='name'
              className='input--signup'
              placeholder='Nombre'
              onChange={handleInput}
              required
            />
            <input
              name='email'
              aria-label='Correo'
              type='email'
              id='email'
              className='input--signup'
              placeholder='Correo'
              onChange={handleInput}
              required
            />
            <input
              name='password'
              aria-label='Contraseña'
              type='password'
              id='password'
              className='input--signup'
              placeholder='Contraseña'
              onChange={handleInput}
              required
            />
            <input
              aria-label='Confirmar contraseña'
              type='password'
              name='password'
              id='confirm-password'
              className='input--signup'
              placeholder='Confirmar contraseña'
              onChange={handleInput}
              required
            />
            <button type='submit' className='button'>
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
    </>
  );
};

const mapDispacthToProps = {
  signUpUser,
};

export default connect(null, mapDispacthToProps)(Signup);

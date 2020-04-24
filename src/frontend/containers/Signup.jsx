import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUpUser } from '../actions';
import Header from '../components/Header';
import ErrorMessages from '../utils/errorMessage';

import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';
import facebookIcon from '../assets/static/facebook.png';

import '../assets/styles/App.scss';

const Signup = (props) => {
  const { register, handleSubmit, errors, getValues } = useForm({ mode: 'onChange', validateCriteriaMode: 'all' });

  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    props.signUpUser(form, '/login');
  };

  return (
    <>
      <Header isSignUp />
      <section className='register'>
        <section className='register__container'>
          <h2>Regístrate</h2>
          <form className='register__container--form' onSubmit={handleSubmit(onSubmit)}>
            <input
              name='name'
              aria-label='Nombre'
              type='text'
              id='name'
              className='input--signup'
              placeholder='Nombre'
              onChange={handleInput}
              ref={register({
                required: true,
                minLength: 3,
              })}
            />
            {errors.name?.type === 'required' && <ErrorMessages name='name' type='required' />}
            {errors.name?.type === 'minLength' && <ErrorMessages name='name' type='minLength' />}
            <input
              name='email'
              aria-label='Correo'
              type='email'
              id='email'
              className='input--signup'
              placeholder='Correo'
              onChange={handleInput}
              ref={register({
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email?.type === 'required' && <ErrorMessages name='email' type='required' />}
            {errors.email?.type === 'pattern' && <ErrorMessages name='email' type='pattern' />}
            <input
              name='password'
              aria-label='Contraseña'
              type='password'
              id='password'
              className='input--signup'
              placeholder='Contraseña'
              onChange={handleInput}
              ref={register({
                required: true,
                pattern: /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                minLength: 8,
                maxLength: 16,
              })}
            />
            {errors?.password?.types?.required && <ErrorMessages name='password' type='required' />}
            {errors?.password?.types?.pattern && <ErrorMessages name='password' type='pattern' />}
            {errors?.password?.types?.minLength && <ErrorMessages name='password' type='minLength' />}
            {errors?.password?.types?.maxLength && <ErrorMessages name='password' type='maxLength' />}
            <input
              name='passwordConfirmation'
              aria-label='Confirmar contraseña'
              type='password'
              id='confirm-password'
              className='input--signup'
              placeholder='Confirmar contraseña'
              ref={register({
                required: <ErrorMessages name='confirmPassword' type='required' />,
                validate: {
                  matchesPassword: (value) => {
                    const { password } = getValues();
                    return password === value || <ErrorMessages name='confirmPassword' type='validate' />;
                  },
                },
              })}
            />
            {errors.passwordConfirmation && errors.passwordConfirmation.message}
            <button type='submit' className='button'>
              Registrarme
            </button>
          </form>
          <section className='register__container--social-media'>
            <div className='google'>
              <img className='google__img' src={googleIcon} alt='GoogleIcon' />
              <p>
                <a href='/auth/google/'>Registro con Google </a>
              </p>
            </div>
            <div className='twitter'>
              <img className='twitter__img' src={twitterIcon} alt='TwitterIcon' />
              <p>
                <a href='/auth/twitter'>Registro con Twitter</a>
              </p>
            </div>
            <div className='facebook'>
              <img className='facebook__img' src={facebookIcon} alt='FacebookIcon' />
              <p>
                <a href='/auth/facebook'>Registro con Facebook</a>
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

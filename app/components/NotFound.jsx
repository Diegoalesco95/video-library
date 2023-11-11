import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className='not-found'>
    <p className='not-found__number'>404</p>
    <p className='not-found__text'>La página que estas buscando no existe.</p>
    <Link to='/'>
      <button type='button' className='not-found__button'>
        Volver al inicio
      </button>
    </Link>
  </section>
);

export default NotFound;

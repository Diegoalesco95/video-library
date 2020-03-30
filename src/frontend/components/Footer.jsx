import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className='footer'>
    <Link to='/'>Términos de uso</Link>
    <Link to='/'>Declaración de privacidad</Link>
    <Link to='/'>Centro de ayuda</Link>
  </footer>
);

export default Footer;

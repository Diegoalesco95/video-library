import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className='footer'>
    <Link to='/Platzi-video/'>Términos de uso</Link>
    <Link to='/Platzi-video/'>Declaración de privacidad</Link>
    <Link to='/Platzi-video/'>Centro de ayuda</Link>
  </footer>
);

export default Footer;

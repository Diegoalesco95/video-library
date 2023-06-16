import React from 'react';

export default function ErrorMessages({ name, type }) {
  if (name === 'name') {
    switch (type) {
      case 'required':
        return (
          <div className='Error_name'>
            <ul>
              <li>El nombre es requerido</li>
            </ul>
          </div>
        );
      case 'minLength':
        return (
          <div className='Error_name'>
            <ul>
              <li>Mínimo 3 carácteres</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  } else if (name === 'email') {
    switch (type) {
      case 'required':
        return (
          <div className='Error_email'>
            <ul>
              <li>El email es requerido</li>
            </ul>
          </div>
        );
      case 'pattern':
        return (
          <div className='Error_email'>
            <ul>
              <li>El email no es válido</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  } else if (name === 'password') {
    switch (type) {
      case 'required':
        return (
          <div className='Error_password'>
            <ul>
              <li>La contraseña es requerida</li>
            </ul>
          </div>
        );
      case 'minLength':
        return (
          <div className='Error_password'>
            <ul>
              <li>Al menos un dígito</li>
              <li>Al menos un carácter especial</li>
              <li>Al menos una letra mayúscula</li>
              <li>Al menos una letra minúscula</li>
              <li>Mínimo 8 carácteres</li>
            </ul>
          </div>
        );
      case 'pattern':
        return (
          <div className='Error_password'>
            <ul>
              <li>Al menos un dígito</li>
              <li>Al menos un carácter especial</li>
              <li>Al menos una letra mayúscula</li>
              <li>Al menos una letra minúscula</li>
              <li>Sin espacios en blanco</li>
            </ul>
          </div>
        );
      case 'maxLength':
        return (
          <div className='Error_password'>
            <ul>
              <li>Al menos un dígito</li>
              <li>Al menos un carácter especial</li>
              <li>Al menos una letra mayúscula</li>
              <li>Al menos una letra minúscula</li>
              <li>Maximo 16 carácteres</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  } else if (name === 'confirmPassword') {
    switch (type) {
      case 'required':
        return (
          <div className='Error_password-conf'>
            <ul>
              <li>La contraseña es requerida</li>
            </ul>
          </div>
        );
      case 'validate':
        return (
          <div className='Error_password-conf'>
            <ul>
              <li>Las contraseñas no coinciden</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  }
}

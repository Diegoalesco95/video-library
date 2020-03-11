import React from 'react';
import { Link } from 'react-router-dom';

const Player = () => {
  return (
    <div className='Player'>
      <video controls autoPlay>
        <source src='video/mp4' />
      </video>
      <div className='Player-back'>
        <Link to='/'>
          <button type='button'>Regresar</button>
        </Link>
      </div>
    </div>
  );
};

export default Player;

import React from 'react';

const Player = (props) => {
  const { id } = props.match.params;
  return (
    <div className='Player'>
      <video controls autoPlay>
        <source src='video/mp4' />
      </video>
      <div className='Player-back'>
        <button type='button' onClick={() => props.history.goBack()}>
          Regresar
        </button>
      </div>
    </div>
  );
};

export default Player;

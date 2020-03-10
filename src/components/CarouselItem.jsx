import React from 'react';

import iconPlay from '../assets/static/play.png';
import iconPlus from '../assets/static/plus.png';

const CarouselItem = () => (
  <div className='carousel-item'>
    <img
      className='carousel-item__img'
      src='https://picsum.photos/200/250?random'
      alt='cover'
    />
    <div className='carousel-item__details'>
      <div className='carousel-item__detail--icon'>
        <a href='/'>
          <img src={iconPlay} alt='Play' />
        </a>
        <a href='/'>
          <img src={iconPlus} alt='Plus' />
        </a>
      </div>
      <h2 className='carousel-item__details--title'>Titulo Descriptivo</h2>
      <p className='carousel-item__details--subtitle'>2019 16+ 114 minutos</p>
    </div>
  </div>
);

export default CarouselItem;

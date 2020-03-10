import React from 'react';

import iconPlay from '../assets/static/play.png';
import iconPlus from '../assets/static/plus.png';

const CarouselItem = ({ cover, title, year, contentRating, duration }) => (
  <div className='carousel-item'>
    <img className='carousel-item__img' src={cover} alt={title} />
    <div className='carousel-item__details'>
      <div className='carousel-item__detail--icon'>
        <a href='/'>
          <img src={iconPlay} alt='Play' />
        </a>
        <a href='/'>
          <img src={iconPlus} alt='Plus' />
        </a>
      </div>
      <h2 className='carousel-item__details--title'>{title}</h2>
      <p className='carousel-item__details--subtitle'>
        {`${year} ${contentRating} ${duration}`}
      </p>
    </div>
  </div>
);

export default CarouselItem;

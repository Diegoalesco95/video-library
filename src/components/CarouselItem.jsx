import React from 'react';
import PropTypes from 'prop-types';

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

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
};

export default CarouselItem;

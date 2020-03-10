import React from 'react';

const Categories = ({ children, title }) => (
  <div className='categories'>
    <h2 className='categories__title'>{title}</h2>
    {children}
  </div>
);

export default Categories;

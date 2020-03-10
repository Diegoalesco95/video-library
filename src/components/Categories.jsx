import React from 'react';

const Categories = ({ children }) => (
  <div className='categories'>
    <h2 className='categories__title'>Mi Lista</h2>
    {children}
  </div>
);

export default Categories;

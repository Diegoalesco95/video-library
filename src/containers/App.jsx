import React from 'react';
import Header from '../components/Header';
import Search from '../components/Search';

import '../assets/styles/App.scss';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Search />
    </div>
  );
};

export default App;

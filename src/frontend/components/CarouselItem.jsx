import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFavoriteUserMovie, deleteFavoriteUserMovie, getUserMovies } from '../actions';

import iconPlay from '../assets/static/play.png';
import iconPlus from '../assets/static/plus.png';
import iconDelete from '../assets/static/remove-icon.png';

const CarouselItem = (props) => {
  const {
    _id,
    cover,
    title,
    year,
    contentRating,
    duration,
    isList,
    userList,
    myList,
    setFavoriteUserMovie,
    deleteFavoriteUserMovie,
    getUserMovies,
  } = props;

  const handleSetFavorite = () => {
    const exist = myList.find((item) => item._id === _id);
    if (!exist) {
      setFavoriteUserMovie({
        _id,
        cover,
        title,
        year,
        contentRating,
        duration,
      });
      getUserMovies({ _id });
      console.log(`${title} ha sido agregado a la lista`);
    } else {
      console.log(`${title} ya fue agregado a la lista`);
    }
  };

  const handleDeleteFavorite = () => {
    const userMovieId = userList.find((userList) => userList.movieId === _id);
    deleteFavoriteUserMovie(userMovieId);
    console.log(`${title} ha sido eliminado a la lista`);
  };

  const handlePlay = (_id) => {
    getVideoSource(_id);
  };

  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={cover} alt={title} />
      <div className='carousel-item__details'>
        <div className='carousel-item__detail--icon'>
          <Link to={`/player/${_id}`}>
            <img src={iconPlay} alt='Play' onClick={() => handlePlay(_id)} />
          </Link>

          {isList ? (
            <img src={iconDelete} alt='Delete' onClick={handleDeleteFavorite} />
          ) : (
            <img src={iconPlus} alt='Plus' onClick={handleSetFavorite} />
          )}
        </div>
        <h2 className='carousel-item__details--title'>{title}</h2>
        <p className='carousel-item__details--subtitle'>{`${year} ${contentRating} ${duration}`}</p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    myList: state.myList,
    userList: state.userList,
  };
};

const mapDispatchToProps = {
  setFavoriteUserMovie,
  deleteFavoriteUserMovie,
  getUserMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);

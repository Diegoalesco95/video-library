import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import NotFound from './NotFound';
import { getVideoSource } from '../actions';
import PageLoading from '../components/PageLoading';

const Player = ({ match, playing, getVideoSource, history }) => {
  const { id } = match.params;
  const [loading, setLoading] = useState(true);
  const hasPlaying = Object.keys(playing).length > 0;

  useEffect(() => {
    getVideoSource(id);
    setLoading(false);
  }, []);

  return loading ? (
    <PageLoading />
  ) : hasPlaying ? (
    <div className='Player'>
      <video controls autoPlay>
        <source src={playing.source} type='video/mp4' />
      </video>
      <div className='Player-back'>
        <button type='button' onClick={() => history.goBack()}>
          Regresar
        </button>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

const mapDispatchToProps = {
  getVideoSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);

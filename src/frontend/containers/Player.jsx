import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import NotFound from './NotFound';
import { getVideoSource } from '../actions';
import PageLoading from '../components/PageLoading';

const Player = ({ match, playing, getVideoSource, history }) => {
  const { id } = match.params;

  const hasPlaying = Object.keys(playing).length > 0;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    getVideoSource(id);
  }, []);

  return loading ? (
    <PageLoading />
  ) : hasPlaying ? (
    <div className='Player'>
      <div className='video'>
        <div className='flexible_video'>
          <iframe
            className='Youtube_video'
            width='1080'
            height='720'
            title={playing.title}
            src={playing.source}
            frameBorder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>
      </div>
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

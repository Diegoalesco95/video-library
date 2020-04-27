import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import axios from 'axios';

import Layout from '../../frontend/components/Layout';
import reducer from '../../frontend/reducers';
import serverRoutes from '../../frontend/routes/serverRoutes';
import setResponse from '../render/index';

const { config } = require('../config/index');

const renderApp = async (req, res, next) => {
  try {
    let initialState;
    const { token, email, name, id } = req.cookies;
    try {
      let userList = await axios({
        url: `${config.apiUrl}/api/user-movies?userId=${id}`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      });
      userList = userList.data.data;

      let movieList = await axios({
        url: `${config.apiUrl}/api/movies`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      });
      movieList = movieList.data.data;

      const myList = [];

      userList.forEach((userMovie) => {
        movieList.forEach((movie) => {
          if (movie._id === userMovie.movieId) {
            myList.push(movie);
          }
        });
      });

      initialState = {
        user: {
          id,
          email,
          name,
        },
        playing: {},
        userList,
        myList,
        trends: movieList.filter((movie) => movie.contentRating === 'NC-17' && movie._id),
        originals: movieList.filter((movie) => movie.contentRating === 'G' && movie._id),
      };
    } catch (error) {
      initialState = {
        user: {},
        playing: {},
        userList: [],
        myList: [],
        trends: {},
        originals: {},
      };
    }
    const isLogged = initialState.user.id;
    const store = createStore(reducer, initialState);
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          <Layout>{renderRoutes(serverRoutes(isLogged))}</Layout>
        </StaticRouter>
      </Provider>,
    );
    const preloadedState = store.getState();
    res.send(setResponse(html, preloadedState, req.hashManifest));
  } catch (error) {
    next(error);
  }
};

export default renderApp;

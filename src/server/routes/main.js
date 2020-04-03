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
    try {
      const { token, email, name, id } = req.cookies;
      let user = {};

      if (email || name || id) {
        user = {
          id,
          email,
          name,
        };
      }

      let movieList = await axios({
        url: `${config.apiUrl}/api/movies`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      });

      let userList = await axios({
        url: `${config.apiUrl}/api/user-movies?userId=${id}`,
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      });

      movieList = movieList.data.data;
      userList = userList.data.data;

      const myList = [];

      initialState = {
        user,
        playing: {},
        myList: userList.filter((movie) => {
          data.data.filter((id) => {
            if (id.movieId === movie._id) {
              myList.push(movie);
            }
          });
        }),
        trends: movieList.filter((movie) => movie.contentRating === 'PG' && movie.id),
        originals: movieList.filter((movie) => movie.contentRating === 'G' && movie.id),
      };
    } catch (error) {
      initialState = {
        user: {},
        playing: {},
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
    res.send(setResponse(html, preloadedState));
  } catch (error) {
    next(error);
  }
};

export default renderApp;

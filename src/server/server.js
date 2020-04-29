/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import express, { json, static as _static } from 'express';
import helmet, { permittedCrossDomainPolicies } from 'helmet';
import webpack from 'webpack';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { unauthorized, badImplementation } from '@hapi/boom';
import passport from 'passport';
import axios from 'axios';

import Layout from '../frontend/components/Layout';
import reducer from '../frontend/reducers';
import serverRoutes from '../frontend/routes/serverRoutes';
import getManifest from './getManifest';

import { config } from './config/index';

import './utils/auth/strategies/basic';
import './utils/auth/strategies/oauth';
import './utils/auth/strategies/google';
import './utils/auth/strategies/twitter';
import './utils/auth/strategies/facebook';

const app = express();

app.use(json());
app.use(cookieParser());
app.use(session({ secret: config.sessionSecret, resave: false, rolling: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(_static(`${__dirname}/public`));

if (config.dev) {
  console.log(`Server running on mode Development:${config.dev}`);
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    port: config.port,
    hot: true,
    stats: { colors: true },
  };
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    req.hashManifest = getManifest();
    next();
  });
  app.use(helmet());
  app.use(permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

// RENDER

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : '/assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : '/assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : '/assets/vendor.js';
  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="${mainStyles}" type="text/css" />
      <title>Platzi Video</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="${vendorBuild}" type="text/javascript"></script>
      <script src="${mainBuild}" type="text/javascript"></script>
    </body>
  </html>
  `;
};

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
        trends: movieList.filter((movie) => movie.contentRating === 'NC-17' && 'PG' && movie._id),
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

// STRATEGIES

const THIRTY_DAYS_IN_SEC = 86400000;
const TWO_HOURS_IN_SEC = 3600000;

app.post('/auth/sign-in', async (req, res, next) => {
  const { rememberMe } = req.body;
  passport.authenticate('basic', async (error, data) => {
    try {
      if (error || !data) {
        next(unauthorized());
      }
      req.login(data, { session: false }, async (error) => {
        if (error) {
          next(error);
        }
        const { token, ...user } = data;
        console.log(token);

        res.cookie('token', token, {
          httpOnly: !config.dev,
          secure: !config.dev,
          domain: 'platzi-videos.herokuapp.com',
          maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC,
        });
        res.status(200).json(user.user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post('/auth/sign-up', async (req, res, next) => {
  const { body: user } = req;
  try {
    const userData = await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: 'post',
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
      },
    });

    res.status(201).json({
      name: req.body.name,
      email: req.body.email,
      id: userData.data.data,
    });
  } catch (err) {
    next(err);
  }
});

app.get('/movies', async (req, res, next) => {
  try {
    const { token, id } = req.cookies;
    debugger;
    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies?userId=${id}`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'get',
    });

    if (status !== 200) {
      return next(badImplementation());
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

app.post('/user-movies', async (req, res, next) => {
  try {
    const { body } = req;
    const { token, id } = req.cookies;

    const userMovie = {
      userId: id,
      movieId: body.movieId,
    };

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'post',
      data: userMovie,
    });

    if (status !== 200 && status !== 201) {
      return next(badImplementation());
    }

    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

app.delete('/user-movies/:userMovieId', async (req, res, next) => {
  try {
    const { userMovieId } = req.params;
    const { token } = req.cookies;

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'delete',
    });

    if (status !== 200) {
      next(badImplementation());
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

// GOOGLE STRATEGY

app.get(
  '/auth/google-oauth',
  passport.authenticate('google-oauth', {
    scope: ['email', 'profile', 'openid'],
  }),
);

app.get('/auth/google-oauth/callback', passport.authenticate('google-oauth', { session: false }), (req, res, next) => {
  if (!req.user) {
    next(unauthorized());
  }
  const { token, ...user } = req.user;
  res.cookie('token', token, {
    httpOnly: !config.dev,
    secure: !config.dev,
  });

  res.status(200).json(user);
});

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile', 'openid'],
  }),
);

app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res, next) => {
  if (!req.user) {
    next(unauthorized());
  }

  const { token, ...user } = req.user;

  res.cookie('token', token, {
    httpOnly: !config.dev,
    secure: !config.dev,
  });

  res.status(200).json(user);
});

// TWITTER STRATEGY

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { session: false }), (req, res, next) => {
  if (!req.user) {
    next(unauthorized());
  }
  const { token, ...user } = req.user;

  res.cookie('token', token, {
    httpOnly: !config.dev,
    secure: !config.dev,
  });
  res.status(200).json(user);
});

// FACEBOOK STRATEGY

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res, next) => {
  if (!req.user) {
    next(unauthorized());
  }

  const { token, ...user } = req.user;

  res.cookie('token', token, {
    httpOnly: !config.dev,
    secure: !config.dev,
  });

  res.status(200).json(user);
});

//

app.get('*', renderApp);

app.listen(config.port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server running on http://localhost:${config.port}/`);
  }
});

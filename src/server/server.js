/* eslint-disable global-require */
import axios from 'axios';
import boom from '@hapi/boom';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import webpack from 'webpack';

import renderApp from './routes/main';

const { config } = require('./config/index');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(`${__dirname}/public`));

if (config.dev === 'development') {
  console.log(`Server running on mode ${config.dev}`);
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    contentBase: 'http://localhost.publicPath',
    port: config.port,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true },
  };
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

require('./utils/auth/strategies/basic');
require('./utils/auth/strategies/oauth');
require('./utils/auth/strategies/google');
require('./utils/auth/strategies/twitter');
require('./utils/auth/strategies/facebook');

app.post('/auth/sign-in', async (req, res, next) => {
  passport.authenticate('basic', async (error, data) => {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }
      req.login(data, { session: false }, async (error) => {
        if (error) {
          next(error);
        }
        const { token, ...user } = data;
        res.cookie('token', token, {
          httpOnly: !config.dev,
          secure: !config.dev,
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
      data: user,
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

app.get('/movies', async (req, res, next) => {});

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

    if (status !== 201) {
      next(boom.badImplementation());
    }

    res.status(201).json(data);
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
      next(boom.badImplementation());
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

app.get(
  '/auth/google-oauth',
  passport.authenticate('google-oauth', {
    scope: ['email', 'profile', 'openid'],
  }),
);

app.get('/auth/google-oauth/callback', passport.authenticate('google-oauth', { session: false }), (req, res, next) => {
  if (!req.user) {
    next(boom.unauthorized());
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
    next(boom.unauthorized());
  }

  const { token, ...user } = req.user;

  res.cookie('token', token, {
    httpOnly: !config.dev,
    secure: !config.dev,
  });

  res.status(200).json(user);
});

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { session: false }), (req, res, next) => {
  if (!req.user) {
    next(boom.unauthorized());
  }
  const { token, ...user } = req.user;

  res.cookie('token', token, {
    httpOnly: !config.dev,
    secure: !config.dev,
  });
  res.status(200).json(user);
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res, next) => {
  if (!req.user) {
    next(boom.unauthorized());
  }

  const { token, ...user } = req.user;

  res.cookie('token', token, {
    httpOnly: !config.dev,
    secure: !config.dev,
  });

  res.status(200).json(user);
});

app.get('*', renderApp);

app.listen(config.port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server running on http://localhost:${config.port}/`);
  }
});

/* eslint-disable global-require */
import express from 'express';
import webpack from 'webpack';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serverRoutes from '../frontend/routes/serverRoutes';
import reducer from '../frontend/reducers';
import initialState from '../frontend/initialState';
import Layout from '../frontend/components/Layout';
import config from './config';

const { env, port } = config;

const app = express();

if (env === 'development') {
  console.log(`Server running on mode ${env}`);
  const webpackConfig = require('../../webpack.dev.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = {
    port,
    hot: true,
  };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
}

const setResponse = (html) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="assets/app.css"  >
      <title>Platzi Video</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="assets/app.js" type="text/javascript"></script>
    </body>
  </html>`;
};

const renderApp = (req, res) => {
  const store = createStore(reducer, initialState);
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>{renderRoutes(serverRoutes)}</Layout>
      </StaticRouter>
    </Provider>
  );
  res.send(setResponse(html));
};

app.get('*', renderApp);

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server running on http://localhost:${port}`);
  }
});

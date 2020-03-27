/* eslint-disable global-require */
import express from 'express';
import webpack from 'webpack';
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

app.get('*', (req, res) => {
  res.send(
    `<!DOCTYPE html>
<html lang="es">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="assets/app.css"  >
    <title>Platzi Video</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="assets/app.js" type="text/javascript"></script>
  </body>
</html>`
  );
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server running on http://localhost:${port}`);
  }
});

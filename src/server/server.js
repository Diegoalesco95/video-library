import express from 'express';
import webpack from 'webpack';
import config from './config';

const { env, port } = config;

const app = express();

if (env === 'development') {
  console.log(`Server running on mode ${env}`);
  // eslint-disable-next-line global-require
  const webpackConfig = require('../../webpack.dev.config');
  // eslint-disable-next-line global-require
  const webpackDevMiddleware = require('webpack-dev-middleware');
  // eslint-disable-next-line global-require
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
  res.send({ hello: 'express' });
});

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server running on http://localhost:${port}`);
  }
});

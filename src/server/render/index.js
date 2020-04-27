import express from 'express';
import getManifest from '../getManifest';

const app = express();

const dotenv = require('dotenv');

dotenv.config();
const isProd = process.env.ENV !== 'development';

if (isProd) {
  app.use((req, res, next) => {
    req.hashManifest = getManifest();
    next();
  });
}

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : '/assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : '/assets/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'assets/vendor.js';
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

export default setResponse;

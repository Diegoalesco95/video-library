import getManifest from '../getManifest';

const { config } = require('../config/index');

let manifest = false;
if (config.dev !== 'development') {
  manifest = getManifest();
}

const setResponse = (html, preloadedState) => {
  const mainStyles = manifest ? manifest['main.css'] : 'css/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'js/app.js';
  const vendorBuild = manifest ? manifest['vendors.js'] : 'js/vendor.js';
  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="${mainStyles}"  >
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

import fs from 'fs';

const dotenv = require('dotenv');

dotenv.config();

const getManifest = () => {
  try {
    if (process.env.ENV !== 'development') {
      return JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`, 'utf8'));
    }
  } catch (error) {
    return {
      'main.css': '/assets/app.css',
      'main.js': '/assets/app.js',
    };
  }
};

export default getManifest;

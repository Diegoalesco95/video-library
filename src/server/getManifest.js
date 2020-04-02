import fs from 'fs';
import config from './config/index';

const getManifest = () => {
  try {
    if (config.dev !== 'development') {
      return JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`));
    }
  } catch (error) {
    console.log(error);
  }
};

export default getManifest;

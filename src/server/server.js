import express from 'express';
import config from './config';

const { env, port } = config;

const app = express();

if (env === 'development') {
  console.log(`Server running on mode ${env}`);
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

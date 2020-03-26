import express from 'express';

const app = express();

app.get('*', (req, res) => {
  res.send({ hello: 'express' });
});

app.listen(3001, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Listening http://localhost:3001');
  }
});

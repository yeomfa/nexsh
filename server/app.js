import fs from 'node:fs';
import express from 'express';
import morgan from 'morgan';

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Root
app.get('/', (req, res) => {
  console.log('Request receive');
  res.status(200).send('<h1>Request receive</h1>');
});

const dbsArr = JSON.parse(
  fs.readFileSync(`./resources/databases.json`, 'utf8'),
);

app.get('/api/v1/databases', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: dbsArr.length,
    data: {
      databases: dbsArr,
    },
  });
});

export default app;

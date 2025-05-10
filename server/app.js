import fs from 'node:fs';
import express from 'express';
import morgan from 'morgan';
import { databasesRouter } from './routes/databasesRoutes.js';

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Mount
app.use('/api/v1/databases', databasesRouter);

export default app;

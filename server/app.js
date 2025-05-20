import express from 'express';
import morgan from 'morgan';
import { databasesRouter } from './routes/databasesRoutes.js';
import { collectionsRouter } from './routes/collectionsRoutes.js';
import { documentsRouter } from './routes/documentsRoutes.js';

const app = express();

// Middlewares
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Include body object in request
app.use(express.json());

// Mount
app.use('/api/v1/databases', databasesRouter);
app.use('/api/v1/collections', collectionsRouter);
app.use('/api/v1/documents', documentsRouter);

export default app;

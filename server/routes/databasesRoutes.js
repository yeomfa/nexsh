import { Router } from 'express';
import controller from '../controllers/databasesController.js';

export const databasesRouter = Router();

databasesRouter
  .route('/')
  .get(controller.getAllDatabases)
  .post(controller.createDatabase);
databasesRouter
  .route('/:id')
  .get(controller.getDatabase)
  .patch(controller.updateDatabase)
  .delete(controller.deleteDatabase);

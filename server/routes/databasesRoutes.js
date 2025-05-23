import { Router } from 'express';
import controller from '../controllers/databasesController.js';

export const databasesRouter = Router();

// Validate ID
databasesRouter.param('name', controller.checkId);

databasesRouter
  .route('/')
  .get(controller.getAllDatabases)
  .post(controller.checkBody, controller.createDatabase);

databasesRouter
  .route('/:name')
  .get(controller.getDatabase)
  .patch(controller.checkBody, controller.updateDatabase)
  .delete(controller.deleteDatabase);

databasesRouter
  .route('/:name/collections')
  .get(controller.getAllCollectionsByDatabase);

databasesRouter
  .route('/:db_name/collections/:col_name')
  .get(controller.getCollectionByDatabase);

databasesRouter
  .route('/:db_name/collections/:col_name/documents')
  .get(controller.getAllDocumentsByCollectionByDatabase);

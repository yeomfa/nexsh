import { Router } from 'express';
import controller from '../controllers/collectionsController.js';

export const collectionsRouter = Router();

collectionsRouter.param('id', controller.checkId);

collectionsRouter
  .route('/')
  .get(controller.getAllCollections)
  .post(controller.checkBody, controller.createCollection);

collectionsRouter
  .route('/:id')
  .get(controller.getCollection)
  .patch(controller.updateCollection)
  .delete(controller.deleteCollection);

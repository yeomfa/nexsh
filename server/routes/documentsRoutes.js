import { Router } from 'express';
import controller from '../controllers/documentsController.js';

export const documentsRouter = Router();

documentsRouter.param('id', controller.checkId);

documentsRouter
  .route('/')
  .get(controller.getAllDocuments)
  .post(controller.checkBody, controller.createDocument);

documentsRouter
  .route('/:id')
  .get(controller.getDocument)
  .patch(controller.updateDocument)
  .delete(controller.deleteDocument);

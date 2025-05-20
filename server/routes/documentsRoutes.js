import { Router } from 'express';
import controller from '../controllers/documentsController.js';

export const documentsRouter = Router();

documentsRouter
  .route('/')
  .get(controller.getAllDocuments)
  .post(controller.createDocument);

documentsRouter.route('/:id').get(controller.getDocument);

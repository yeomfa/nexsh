import { Router } from 'express';
import controller from '../controllers/collectionsController.js';

export const collectionsRouter = Router();

collectionsRouter.route('/').get(controller.getAllCollections);

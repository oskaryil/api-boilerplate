/**
 * Order Routes
 */

import { Router } from 'express';
import validate from 'express-validation';

import * as OrderController from '../controllers/order.controller';
import { authJwt } from '../services/auth';

const routes = new Router();

routes
  .route('/')
  .post(
    authJwt,
    validate(OrderController.validation),
    OrderController.createOrder,
  );

export default routes;

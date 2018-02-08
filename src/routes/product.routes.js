/**
 * Product Routes
 */

import { Router } from 'express';
import validate from 'express-validation';

import * as ProductController from '../controllers/product.controller';
import { authJwt } from '../services/auth';

const routes = new Router();

routes
  .route('/')
  .post(
    authJwt,
    validate(ProductController.validation.create),
    ProductController.createProduct,
  )
  .get(ProductController.getAllProducts);

// routes.route("/search").get(ProductController.searchProducts);

routes
  .route('/:id')
  .delete(authJwt, ProductController.deleteProduct)
  .patch(
    authJwt,
    validate(ProductController.validation.update),
    ProductController.updateProduct,
  )
  .get(ProductController.getSingleProduct);

export default routes;

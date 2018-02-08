import Joi from 'joi';
import HTTPStatus from 'http-status';
import { ObjectID } from 'mongodb';
import constants from '../config/constants';

import { filteredBody } from '../utils/filteredBody';

import Product from '../models/product.model';

export const validation = {
  create: {
    body: {
      title: Joi.string()
        .min(3)
        .required(),
      description: Joi.string()
        .min(3)
        .required(),
      imageUrl: Joi.string()
        .min(3)
        .required(),
      price: Joi.number().required(),
      currency: Joi.string().required(),
      category: Joi.string()
        .min(2)
        .required(),
      subCategory: Joi.string(),
    },
  },
  update: {
    body: {
      title: Joi.string().min(3),
      description: Joi.string().min(3),
      imageUrl: Joi.string().min(3),
      price: Joi.number(),
      currency: Joi.string(),
      category: Joi.string().min(2),
      subCategory: Joi.string(),
    },
  },
  delete: {
    body: {
      _id: Joi.string()
        .min(24)
        .required(),
    },
  },
};

/**
 * @api {post} /products Create a product
 * @apiDescription Create a product
 * @apiName createProduct
 * @apiGroup Product
 *
 * @apiParam (body) {String} title
 * @apiParam (body) {String} description
 * @apiParam (body) {String} imageUrl
 * @apiParam (body) {Number} price
 * @apiParam (body) {String} currency
 * @apiParam (body) {String} category
 * @apiParam (body) {[String]} subCategory
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiSuccess {Number} status Status of the Request
 * @apiSuccess {String} message Description of what has been done.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 201 CREATED
 *
 * {
 *  message: 'New product created.'
 * }
 *
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
export const createProduct = async (req, res, next) => {
  const body = filteredBody(req.body, constants.WHITELIST.products.create);
  try {
    const newProduct = await Product.createProduct(body, req.user.useruuid);
    res
      .status(HTTPStatus.CREATED)
      .json({ product: newProduct, message: 'New product created. ' });
  } catch (err) {
    return next(err);
  }
};

/**
 * @api {delete} /products/:id Delete a product
 * @apiDescription Delete a product
 * @apiName deleteProduct
 * @apiGroup Product
 *
 * @apiParam (param) {String} id MongoDB ObjectID of the Product
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiSuccess {Number} status Status of the Request
 * @apiSuccess {String} message Description of what has been done.
 * @apiSuccess {Object} deleted The object of the product that has been deleted
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 *
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 201 CREATED
 *
 * {
 *  message: 'New product created.'
 * }
 *
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
export const deleteProduct = async (req, res, next) => {
  // const body = filteredBody(req.body, constants.WHITELIST.products.delete);
  try {
    if (!ObjectID.isValid(req.params.id)) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ message: 'Invalid MongoDB ObjectID.' });
    }
    const product = await Product.findById(req.params.id);
    // if (!deletedProduct) {
    //   /* eslint-disable no-throw-literal */
    //   throw {
    //     name: "Product error",
    //     message: "No product found with that _id",
    //     status: 400
    //   };
    // }
    const removedProduct = await product.remove();
    return res.status(HTTPStatus.OK).json({
      deleted: removedProduct.toObject(),
      message: 'Product has been deleted.',
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * @api {get} /products Get products
 * @apiDescription Get all products or products of a specific category
 * @apiName getAllProducts
 * @apiGroup Product
 *
 * @apiHeader {Authorization} Authorization JWT Token
 *
 * @apiParam (query) {[String]} category The product category to find products of.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {Array[]} product List of products.
 * @apiSuccess {String} product._id Product _id.
 * @apiSuccess {String} product.title Product title.
 * @apiSuccess {Number} product.price Product price.
 * @apiSuccess {String} product.currency Product currency.
 * @apiSuccess {String} product.slug Product slug.
 * @apiSuccess {String} product.imageUrl Product imageUrl.
 * @apiSuccess {String} product.category Product category.
 * @apiSuccess {String} product.createdBy Product creator useruuid.
 * @apiSuccess {String} product.createdAt Product created date.
 * @apiSuccess {String} product.updatedAt Product updated date.
 *
 *
 * @apiParam (Login) {String} pass Only logged in users can do this.
 *
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "AUTHORIZATION": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio"
 * }
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * [
 * 	{
 *		"_id": "59dcf71bb5e1ad3b38395432",
 *		"updatedAt": "2017-10-10T16:36:43.433Z",
 *		"createdAt": "2017-10-10T16:36:43.433Z",
 *		"slug": "sysadmin-101",
 *		"title": "Sysadmin 101",
 *		"description": "The one and only sysadmin book you need!",
 *		"price": 400,
 *		"currency": "SEK",
 *		"imageUrl": "https://images-na.ssl-images-amazon.com/images/I/61iWkQ87uTL._SX381_BO1,204,203,200_.jpg",
 *		"category": "Books",
 *		"createdBy": "e499f2f4-6d9c-449d-9753-82827c9e5e50",
 *		"__v": 0
 *	}
 * ]
 *
 * @apiErrorExample {json}
 *    HTTP/1.1 400 Bad Request
 * @apiErrorExample {json} Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
export const getAllProducts = async (req, res, next) => {
  try {
    if (req.query.category) {
      const products = await Product.getProductsByCategory(req.query.category);
      return res.status(HTTPStatus.OK).json(products);
    }
    return res.status(HTTPStatus.OK).json(await Product.find());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    next(err);
  }
};

// export const searchProducts = async (req, res, next) => {
//   try {
//     const searchTerms = req.query.q;
//     return Product.search(
//       { query_string: { query: `*${searchTerms}*` } },
//       { hydrate: true },
//       (err, results) => {
//         if (err) {
//           throw err;
//         }
//         return res.status(HTTPStatus.OK).json(results.hits);
//       }
//     );
//   } catch (err) {
//     err.status = HTTPStatus.BAD_REQUEST;
//     next(err);
//   }
// };

// TODO: Write apidoc spec
export const updateProduct = async (req, res, next) => {
  const body = filteredBody(req.body, constants.WHITELIST.products.update);
  const productId = req.params.id;
  try {
    if (!ObjectID.isValid(productId)) {
      return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ message: 'Invalid MongoDB ObjectID.' });
    }
    const currentProduct = await Product.findById(productId);
    // Set the updated data
    // TODO: Perhaps change the way that it is updated with ex. findByIdAndUpdate
    await currentProduct.set({ ...body });
    // Save the updated product and send it back.
    return res.status(HTTPStatus.OK).json(await currentProduct.save());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    next(err);
  }
};
// TODO: Write apidoc spec
export const getSingleProduct = async (req, res, next) => {
  if (req.params.id) {
    const productId = req.params.id;
    try {
      if (!ObjectID.isValid(productId)) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ message: 'Invalid MongoDB ObjectID.' });
      }
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ message: 'A product with that id could not be found.' });
      }
      return res.status(HTTPStatus.OK).json(product);
    } catch (err) {
      err.status = HTTPStatus.BAD_REQUEST;
      next(err);
    }
  } else if (req.query.slug) {
    const productSlug = req.query.slug;
    try {
      const product = await Product.find({ slug: productSlug });
      if (!product) {
        return res
          .status(HTTPStatus.BAD_REQUEST)
          .json({ message: 'A product with that id could not be found.' });
      }
      return res.status(HTTPStatus.OK).json(product);
    } catch (err) {
      err.status = HTTPStatus.BAD_REQUEST;
      next(err);
    }
  } else {
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ message: 'Please specify id as a param or slug as a query' });
  }
};

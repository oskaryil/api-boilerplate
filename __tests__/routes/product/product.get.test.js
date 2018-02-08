import { expect, assert } from 'chai';

import Product from '../../../src/models/product.model';
import User from '../../../src/models/user.model';
import server from '../../../__mocks__/utils/server.mock';
import ProductFactory from '../../../__mocks__/factories/product.factory.js';
import UserFactory from '../../../__mocks__/factories/user.factory.js';

let ENDPOINT = '/api/products';

let testUser;
let testProduct;

describe(`GET ${ENDPOINT}`, () => {
  before(async () => {
    await Product.remove();
    testProduct = await Product.create(ProductFactory.generate());
  });

  describe('Get all products', () => {
    it('should get all products with a status of 200', done => {
      server
        .get(ENDPOINT)
        .expect(200)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(200);
          assert.typeOf(body, 'array');
          expect(body.length).to.equal(1);
          done();
        });
    });
  });
});

describe(`GET ${ENDPOINT}/:id`, () => {
  before(async () => {
    await Product.remove();
    testProduct = await Product.create(ProductFactory.generate());
    ENDPOINT = `/api/products/${testProduct._id}`;
  });

  describe('Get a product', () => {
    it('should get a product with status 200', done => {
      server
        .get(ENDPOINT)
        .expect(200)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(200);
          assert.typeOf(body, 'object');
          done();
        });
    });
  });
});

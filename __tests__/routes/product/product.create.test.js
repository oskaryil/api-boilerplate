import { expect } from 'chai';

import Product from '../../../src/models/product.model';
import User from '../../../src/models/user.model';
import server from '../../../__mocks__/utils/server.mock';
import ProductFactory from '../../../__mocks__/factories/product.factory.js';
import UserFactory from '../../../__mocks__/factories/user.factory.js';

const ENDPOINT = '/api/products';

let testUser;
let testProduct;

describe(`POST ${ENDPOINT}`, () => {
  before(async () => {
    await Product.remove();
    testUser = await User.createUser(UserFactory.generate());
    testProduct = ProductFactory.generate();
  });

  describe('create a product', () => {
    it('should create a product with the status 201', done => {
      server
        .post(ENDPOINT)
        .set('Authorization', `JWT ${testUser.accesstoken}`)
        .send(testProduct)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(201);
          expect(body.message).to.equal('New product created. ');
          done();
        });
    });
  });

  describe('create product with invalid data', () => {
    it('should fail to create a product with invalid data and get status 400', done => {
      server
        .post(ENDPOINT)
        .set('Authorization', `JWT ${testUser.accesstoken}`)
        .send({ title: 'hello', whatever: 'whatever' })
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(400);
          done();
        });
    });
  });

  describe('Unauthorized with the status 401', () => {
    it('should get 401 when accessToken is missing', done => {
      server
        .post(ENDPOINT)
        .send(testProduct)
        .expect(401)
        .end(done);
    });
  });
});

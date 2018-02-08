import { expect } from 'chai';

import Product from '../../../src/models/product.model';
import User from '../../../src/models/user.model';
import server from '../../../__mocks__/utils/server.mock';
import ProductFactory from '../../../__mocks__/factories/product.factory.js';
import UserFactory from '../../../__mocks__/factories/user.factory.js';

let ENDPOINT = '/api/products';

let testUser;
let testProduct;

describe(`PATCH ${ENDPOINT}/:id`, () => {
  before(async () => {
    await Product.remove();
    testUser = await User.createUser(UserFactory.generate());
    testProduct = await Product.create(ProductFactory.generate());
    ENDPOINT += `/${testProduct._id}`;
  });

  describe('Update a product', () => {
    it('should update a product with the status of 200', done => {
      server
        .patch(ENDPOINT)
        .set('Authorization', `JWT ${testUser.accesstoken}`)
        .send(ProductFactory.generate())
        .expect(200)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(200);
          done();
        });
    });
  });

  describe('Update a product with invalid ObjectID', () => {
    it('should get status 400 with invalid ObjectId', done => {
      server
        .patch(ENDPOINT + '123123')
        .set('Authorization', `JWT ${testUser.accesstoken}`)
        .send(ProductFactory.generate())
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(400);
          expect(body.message).to.equal('Invalid MongoDB ObjectID.');
          done();
        });
    });
  });

  describe('Update a product with invalid / incomplete data', () => {
    it('should get status 400 with invalid data', done => {
      server
        .patch(ENDPOINT)
        .set('Authorization', `JWT ${testUser.accesstoken}`)
        .send({ title: 1 })
        .expect(400)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(400);
          expect(body.errors.title).to.equal('title must be a string');
          expect(Object.keys(body.errors).length).to.equal(1);
          done();
        });
    });
  });

  describe('Unauthorized with the status 401', () => {
    it('should get 401 when accessToken is missing', done => {
      server
        .patch(ENDPOINT)
        .expect(401)
        .end(done);
    });
  });
});

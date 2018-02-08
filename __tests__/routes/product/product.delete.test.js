import { expect } from 'chai';

import Product from '../../../src/models/product.model';
import User from '../../../src/models/user.model';
import server from '../../../__mocks__/utils/server.mock';
import ProductFactory from '../../../__mocks__/factories/product.factory.js';
import UserFactory from '../../../__mocks__/factories/user.factory.js';

let ENDPOINT = '/api/products';

let testUser;
let testProduct;

describe(`DELETE ${ENDPOINT}/:id`, () => {
  before(async () => {
    await Product.remove();
    testUser = await User.createUser(UserFactory.generate());
    testProduct = await Product.create(ProductFactory.generate());
    ENDPOINT += `/${testProduct._id}`;
  });

  describe('Delete a product', () => {
    it('should delete a product with the status of 200', done => {
      server
        .delete(ENDPOINT)
        .set('Authorization', `JWT ${testUser.accesstoken}`)
        .expect(200)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(200);
          expect(body.message).to.equal('Product has been deleted.');
          done();
        });
    });
  });

  describe('Delete a product with invalid ObjectID', () => {
    it('should get status 400 with invalid ObjectId', done => {
      server
        .delete(ENDPOINT + '123123')
        .set('Authorization', `JWT ${testUser.accesstoken}`)
        .end((err, res) => {
          const { body, status } = res;
          expect(status).to.equal(400);
          expect(body.message).to.equal('Invalid MongoDB ObjectID.');
          done();
        });
    });
  });

  describe('Unauthorized with the status 401', () => {
    it('should get 401 when accessToken is missing', done => {
      server
        .delete(ENDPOINT)
        .expect(401)
        .end(done);
    });
  });
});

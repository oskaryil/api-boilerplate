/**
 * Product Model Tests
*/

import { expect } from 'chai';

import Product from '../../src/models/product.model';
import ProductFactory from '../../__mocks__/factories/product.factory';
import '../../src/config/database';
//import mongoose from 'mongoose';
//mongoose.connect(process.env.MONGO_URL_TEST || 'mongodb://localhost/node-ecommerce-test', { useMongoClient: true });
//mongoose.Promise = global.Promise;

let testProduct;

describe('Model: Product', () => {
  before(async () => {
    await Product.remove();
    //testProduct = await Product.create(ProductFactory.generate());
  });

  describe('#save()', () => {
    it('should have a required title, description, imageUrl, price, currency, category, createdBy, slug', done => {
      const product = new Product();
      const { errors } = product.validateSync();
      expect(errors.title.message).to.equal('Path `title` is required.');
      expect(errors.description.message).to.equal(
        'Path `description` is required.',
      );
      expect(errors.imageUrl.message).to.equal('Path `imageUrl` is required.');
      expect(errors.price.message).to.equal('Path `price` is required.');
      expect(errors.category.message).to.equal('Path `category` is required.');
      expect(errors.createdBy.message).to.equal(
        'Path `createdBy` is required.',
      );
      expect(errors.slug.message).to.equal('Path `slug` is required.');
      expect(errors.currency.message).to.equal('Path `currency` is required.');
      done();
    });
  });
});

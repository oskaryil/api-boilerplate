/**
 * Product Factory
*/

import faker from 'faker';

import BaseFactory from './base.factory';

class ProductFactory extends BaseFactory {
  generate(attrs) {
    return {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      currency: faker.finance.currencyCode(),
      category: faker.commerce.department(),
      imageUrl: faker.image.imageUrl(),
      createdBy: faker.random.uuid(),
      description: faker.lorem.paragraph(),
      ...attrs,
    };
  }
}

export default new ProductFactory();

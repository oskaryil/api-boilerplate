import faker from 'faker';

import BaseFactory from './base.factory';

class OrderFactory extends BaseFactory {
  generate(products, attrs) {
    return {
      cart: {
        ...products,
      },
      shipping_address: {
        address: faker.address.streetAddress('###'),
        zipcode: faker.address.zipCode(),
        city: faker.address.city(),
      },
      billing_address: {
        address: faker.address.streetAddress('###'),
      },
      stripeToken: 'tok_visa_debit',
      transaction_id: faker.random.uuid(),
      //currency: faker.finance.currencyCode()
      currency: 'SEK',
    };
  }
}

export default new OrderFactory();

//import { expect, assert } from 'chai';
//import SQL from 'sql-template-strings';
//import uuidv4 from 'uuid/v4';
//import nock from 'nock';

//import User from '../../../src/models/user.model';
//import Product from '../../../src/models/product.model';
//import Order from '../../../src/models/order.model';
//import UserFactory from '../../../__mocks__/factories/user.factory';
//import ProductFactory from '../../../__mocks__/factories/product.factory';
//import OrderFactory from '../../../__mocks__/factories/order.factory';
//import server from '../../../__mocks__/utils/server.mock';
//import { db } from '../../../src/config/database';
//import stripeResponses from './stripeResponses';

//const ENDPOINT = '/api/orders';

//let testUser;
//let testProducts;
//let testCart = {};
//let testOrder;
//let totalPrice = 0;

//describe(`POST ${ENDPOINT}`, () => {
//before(async () => {
//await Product.remove();
//await db.none(SQL`
//DELETE FROM orders
//`);

//testUser = await User.createUser(UserFactory.generate());
//});

//beforeEach(async () => {
//const product1 = await Product.create(ProductFactory.generate());
//const product2 = await Product.create(ProductFactory.generate());
//const product3 = await Product.create(ProductFactory.generate());
//testProducts = [
//product1.toObject(),
//product2.toObject(),
//product3.toObject(),
//];
//for (let product of testProducts) {
//testCart[product._id] = {
//qty: 1,
//};
//totalPrice += product.price;
//}
//testOrder = OrderFactory.generate(testCart);
/*
     *nock('https://api.stripe.com/v1/')
     *  .post('/charges', {
     *    amount: totalPrice,
     *    currency: testOrder.currency,
     *    source: testOrder.stripeToken,
     *  })
     *  .reply(200, stripeResponses.charge);
     *nock('https://api.stripe.com/v1')
     *  .post('/customers', {
     *    source: testOrder.stripeToken
     *  })
     *  .reply(200, stripeResponses.customers);
     */
//});

//describe('Create an order', () => {
//it('should create an order with the status 201', done => {
//server
//.post(ENDPOINT)
//.set('Authorization', `JWT ${testUser.accesstoken}`)
//.send(testOrder)
//.expect(201)
//.end((err, res) => {
//const { body, status } = res;
//assert.typeOf(body, 'object');
//expect(body.order.total_price).to.equal(totalPrice.toString());
//done();
//});
//});
//});
//});

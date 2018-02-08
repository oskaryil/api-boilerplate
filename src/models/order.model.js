import SQL from 'sql-template-strings';
import uuidv4 from 'uuid/v4';
import mongoose from 'mongoose';

import { db } from '../config/database';
import Product from './product.model';

export default {
  async createOrder(data) {
    try {
      await validateOrderData(data);
      const orderId = uuidv4();
      const cart = data.cart;
      let totalPrice = 0;
      const productIds = [];
      Object.keys(cart).forEach(productId => {
        productIds.push(productId);
      });
      const products = await Product.find({
        _id: { $in: productIds.map(id => mongoose.Types.ObjectId(id)) },
      });
      products.map(
        product => (totalPrice += cart[product._id].qty * product.price),
      );
      // db.tx(t => {
      //   const q1 = t.one(SQL`
      //     INSERT INTO orders
      //     (order_id, created_by, cart, total_price, transaction_id, shipping_address)
      //     VALUES (
      //       ${orderId},
      //       ${data.created_by},
      //       ${data.cart},
      //       ${totalPrice},
      //       ${data.transaction_id},
      //       ${data.shipping_address}
      //     )
      //     returning order_id
      //   `);
      //   const q2 = t.none;
      // });
      return await db.one(SQL`
        INSERT INTO orders
        (order_id, created_by, cart, total_price, shipping_address)
        VALUES (
          ${orderId},
          ${data.created_by},
          ${data.cart},
          ${totalPrice},
          ${data.shipping_address}
        )
        returning order_id, total_price
      `);
    } catch (err) {
      throw err;
    }
  },

  async getAllOrders() {
    try {
      return await db.any(SQL`
        SELECT * FROM orders
      `);
    } catch (err) {
      throw err;
    }
  },

  async getOrder(orderId) {
    try {
      return await db.one(SQL`
        SELECT * FROM orders
        WHERE order_id = ${orderId}
      `);
    } catch (err) {
      throw err;
    }
  },
};

// TODO: Write a utility for this function because it is repeating in every model.
function validateOrderData(data) {
  return new Promise((resolve, reject) => {
    const requiredFields = ['cart', 'created_by', 'shipping_address'];
    const errors = {};
    requiredFields.forEach(field => {
      if (!data[field]) {
        errors[field] = 'Field is required';
      }
    });
    if (Object.keys(errors).length !== 0 && errors.constructor === Object) {
      reject(errors);
    } else {
      resolve();
    }
  });
}

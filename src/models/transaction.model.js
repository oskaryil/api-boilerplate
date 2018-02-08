import SQL from 'sql-template-strings';
import uuidv4 from 'uuid/v4';

import { db } from '../config/database';

export default {
  async createTransaction(data) {
    try {
      await validadateTransactionData(data);
      const transactionId = uuidv4();
      const transaction = await db.tx(async t => {
        const q1 = await t.one(SQL`
          SELECT order_id, total_price FROM orders
          WHERE order_id = ${data.order_id}
        `);
        const q2 = await t.one(SQL`
          INSERT INTO transactions
          (transaction_id, created_by, amount, currency, stripe_customer_id, stripe_charge_id, order_id, billing_address)
          VALUES (
            ${transactionId},
            ${data.created_by},
            ${parseFloat(q1.total_price)},
            ${data.currency},
            ${data.stripe_customer_id},
            ${data.stripe_charge_id},
            ${q1.order_id},
            ${data.billing_address}
          )
          returning transaction_id
        `);
        const q3 = t.none(SQL`
          UPDATE orders
          SET transaction_id = ${q2.transaction_id}
          WHERE order_id = ${q1.order_id}
        `);
        return t.batch([q1, q2, q3]);
      });
      return transaction;
    } catch (err) {
      throw err;
    }
  },
};

function validadateTransactionData(data) {
  return new Promise(async (resolve, reject) => {
    const requiredFields = [
      'created_by',
      'amount',
      'currency',
      'stripe_customer_id',
      'stripe_charge_id',
      'order_id',
      'billing_address',
    ];
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

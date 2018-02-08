import stripePackage from 'stripe';

import User from '../models/user.model';
import Transaction from '../models/transaction.model';
import constants from '../config/constants';

const stripe = stripePackage(constants.STRIPE_SECRET);

export async function createCharge(useruuid, chargeDetails) {
  try {
    const charge = await stripe.charges.create({
      amount: chargeDetails.amount * 100,
      customer: chargeDetails.customer,
      currency: chargeDetails.currency,
    });
    return await Transaction.createTransaction({
      created_by: useruuid,
      amount: chargeDetails.amount,
      currency: chargeDetails.currency,
      stripe_customer_id: chargeDetails.customer,
      billing_address: chargeDetails.billing_address,
      stripe_charge_id: charge.id,
      order_id: chargeDetails.order_id,
    });
  } catch (err) {
    throw err;
  }
}

export async function createCustomer(useruuid, customerDetails) {
  try {
    const customer = await stripe.customers.create({
      ...customerDetails,
    });
    await User.createCustomer(useruuid, customer.id);
    return customer.id;
  } catch (err) {
    throw err;
  }
}

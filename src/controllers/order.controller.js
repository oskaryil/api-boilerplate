import Joi from 'joi';
import HTTPStatus from 'http-status';

import Order from '../models/order.model.js';
import { filteredBody } from '../utils/filteredBody';
import constants from '../config/constants';
import { createCharge, createCustomer } from '../services/payment';

export const validation = {
  create: {
    body: {
      cart: Joi.object().required(),
      transaction_id: Joi.string().guid({ version: 'uuidv4' }),
      shipping_address: Joi.object().required(),
      billing_address: Joi.object().required(),
      stripeToken: Joi.string().required(),
      currency: Joi.string().required(),
    },
  },
};

export const createOrder = async (req, res, next) => {
  const body = filteredBody(req.body, constants.WHITELIST.orders.create);
  try {
    const order = await Order.createOrder({
      ...body,
      created_by: req.user.useruuid,
    });
    let customerId = req.user.stripe_customer_id;
    if (!customerId) {
      customerId = await createCustomer(req.user.useruuid, {
        email: req.user.email,
        source: body.stripeToken,
      });
    }
    await createCharge(req.user.useruuid, {
      currency: body.currency,
      amount: parseFloat(order.total_price),
      customer: customerId,
      order_id: order.order_id,
      billing_address: body.billing_address,
    });
    return res
      .status(HTTPStatus.CREATED)
      .json({ message: 'Order created', order });
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    next(err);
  }
};

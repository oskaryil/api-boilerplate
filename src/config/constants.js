require('dotenv').config();

const WHITELIST = {
  posts: {
    create: ['title', 'text'],
    update: ['title', 'text'],
  },
  users: {
    create: ['email', 'username', 'password', 'name'],
  },
  products: {
    create: [
      'title',
      'description',
      'imageUrl',
      'price',
      'currency',
      'category',
      'subCategory',
    ],
    delete: ['_id'],
    update: [
      'title',
      'description',
      'imageUrl',
      'price',
      'currency',
      'category',
      'subCategory',
    ],
  },
  orders: {
    create: [
      'transaction_id',
      'cart',
      'shipping_address',
      'billing_address',
      'stripeToken',
      'currency',
    ],
  },
};

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  MONGO_URL: process.env.MONGO_URL_DEV,
  POSTGRES_URL: process.env.POSTGRES_URL_DEV,
  STRIPE_SECRET: process.env.STRIPE_TEST_SECRET,
};

const testConfig = {
  JWT_SECRET: process.env.JWT_SECRET_TEST,
  // MONGO_URL: process.env.MONGO_URL_TEST,
  MONGO_URL: 'mongodb://localhost/node-ecommerce-test',
  STRIPE_SECRET: process.env.STRIPE_TEST_SECRET,
  POSTGRES_URL: process.env.POSTGRES_URL_TEST,
};

const prodConfig = {
  JWT_SECRET: process.env.JWT_SECRET_PROD,
  MONGO_URL: process.env.MONGO_URL_PROD,
  POSTGRES_URL: process.env.POSTGRES_URL_PROD,
  STRIPE_SECRET: process.env.STRIPE_LIVE_SECRET,
};

const defaultConfig = {
  PORT: process.env.PORT || 4000,
  RAVEN_ID: process.env.RAVEN_ID,
  WHITELIST,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};

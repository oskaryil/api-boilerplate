DROP DATABASE IF EXISTS node_ecommerce_dev;
CREATE DATABASE node_ecommerce_dev;

\c node_ecommerce_dev;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  userUUID UUID NOT NULL UNIQUE PRIMARY KEY,
  name VARCHAR NOT NULL,
  accessToken VARCHAR,
  email VARCHAR NOT NULL UNIQUE,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW() NOT NULL,
  updatedAt TIMESTAMP,
  stripe_customer_id VARCHAR
);


DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
  transaction_id UUID NOT NULL UNIQUE,
  amount DECIMAL NOT NULL,
  currency VARCHAR NOT NULL,
  created_by UUID NOT NULL,
  stripe_customer_id VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  order_id UUID NOT NULL,
  billing_address JSON NOT NULL,
  stripe_charge_id VARCHAR NOT NULL,
  PRIMARY KEY (transaction_id),
  FOREIGN KEY (created_by) REFERENCES users(useruuid) ON DELETE CASCADE
  -- FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  order_id UUID NOT NULL UNIQUE,
  created_by UUID NOT NULL,
  cart JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  total_price DECIMAL NOT NULL,
  transaction_id UUID,
  shipping_address JSON NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (created_by) REFERENCES users(useruuid) ON DELETE CASCADE,
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

DROP DATABASE IF EXISTS node_ecommerce_test;
CREATE DATABASE node_ecommerce_test;

\c node_ecommerce_test;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  userUUID UUID NOT NULL UNIQUE PRIMARY KEY,
  name VARCHAR NOT NULL,
  accessToken VARCHAR,
  email VARCHAR NOT NULL UNIQUE,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW() NOT NULL,
  updatedAt TIMESTAMP,
  stripe_customer_id VARCHAR
);
DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
  transaction_id UUID NOT NULL UNIQUE,
  amount DECIMAL NOT NULL,
  currency VARCHAR NOT NULL,
  created_by UUID NOT NULL,
  stripe_customer_id VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  order_id UUID NOT NULL,
  billing_address JSON NOT NULL,
  stripe_charge_id VARCHAR NOT NULL,
  PRIMARY KEY (transaction_id),
  FOREIGN KEY (created_by) REFERENCES users(useruuid) ON DELETE CASCADE
  -- FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  order_id UUID NOT NULL UNIQUE,
  created_by UUID NOT NULL,
  cart JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  total_price DECIMAL NOT NULL,
  transaction_id UUID,
  shipping_address JSON NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (created_by) REFERENCES users(useruuid) ON DELETE CASCADE,
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);
DROP DATABASE IF EXISTS node_ecommerce_prod;
CREATE DATABASE node_ecommerce_prod;

\c node_ecommerce_prod;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  userID SERIAL NOT NULL UNIQUE PRIMARY KEY,
  userUUID UUID NOT NULL UNIQUE,
  name VARCHAR NOT NULL,
  accessToken VARCHAR,
  email VARCHAR NOT NULL UNIQUE,
  username VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL,
  createdAt TIMESTAMP DEFAULT NOW() NOT NULL,
  updatedAt TIMESTAMP,
  stripe_customer_id VARCHAR
);
DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
  transaction_id UUID NOT NULL UNIQUE,
  amount DECIMAL NOT NULL,
  currency VARCHAR NOT NULL,
  created_by UUID NOT NULL,
  stripe_customer_id VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  order_id UUID NOT NULL,
  billing_address JSON NOT NULL,
  stripe_charge_id VARCHAR NOT NULL,
  PRIMARY KEY (transaction_id),
  FOREIGN KEY (created_by) REFERENCES users(useruuid) ON DELETE CASCADE
  -- FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  order_id UUID NOT NULL UNIQUE,
  created_by UUID NOT NULL,
  cart JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  total_price DECIMAL NOT NULL,
  transaction_id UUID,
  shipping_address JSON NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (created_by) REFERENCES users(useruuid) ON DELETE CASCADE,
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

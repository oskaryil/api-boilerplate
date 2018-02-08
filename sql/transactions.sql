\c node_ecommerce_dev;

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
  FOREIGN KEY (created_by) REFERENCES users(useruuid)
  -- FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

\c node_ecommerce_test;

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
  FOREIGN KEY (created_by) REFERENCES users(useruuid)
  -- FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

\c node_ecommerce_prod;

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
  FOREIGN KEY (created_by) REFERENCES users(useruuid)
  -- FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

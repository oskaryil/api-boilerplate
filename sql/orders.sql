\c node_ecommerce_dev;

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
  FOREIGN KEY (created_by) REFERENCES users(useruuid),
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

\c node_ecommerce_test;

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
  FOREIGN KEY (created_by) REFERENCES users(useruuid),
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

\c node_ecommerce_prod;

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
  FOREIGN KEY (created_by) REFERENCES users(useruuid),
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

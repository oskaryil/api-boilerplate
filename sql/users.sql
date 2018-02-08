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
DROP DATABASE IF EXISTS node_ecommerce_prod;
CREATE DATABASE node_ecommerce_prod;

\c node_ecommerce_prod;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  userID SERIAL NOT NULL UNIQUE PRIMARY KEY PRIMARY KEY,
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

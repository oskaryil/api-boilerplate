/* eslint-disable no-console */

/**
 * Configuration for the database
 */

import mongoose from 'mongoose';
import pg from 'pg-promise';
import constants from './constants';

// Initialize pg-promise
const pgp = pg();

const db = pgp(constants.POSTGRES_URL);

// Remove the warning with Promise
mongoose.Promise = global.Promise;

// If debug run the mongoose debug options
mongoose.set('debug', process.env.MONGOOSE_DEBUG);

// Connect the db with the url provide
try {
  mongoose.connect(constants.MONGO_URL, {
    useMongoClient: true,
  });
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL, {
    useMongoClient: true,
  });
}

mongoose.connection
  .once('open', () => console.log('MongoDB Running'))
  .on('error', e => {
    throw e;
  });

export { db };

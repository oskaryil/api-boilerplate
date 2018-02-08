/* eslint-disable import/no-mutable-exports */

import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import SQL from 'sql-template-strings';
import uuidv4 from 'uuid/v4';

import constants from '../config/constants';
import { db } from '../config/database';

export default {
  /**
   * Authenticate the user
   *
   * @public
   * @param {String} password - provided by the user
   * @returns {Boolean} isMatch - password match
   */
  authenticateUser(password, hashedPassword) {
    return compareSync(password, hashedPassword);
  },

  /**
   * find a user
   * @param  {String}  field the SQL column which to look up
   * @param  {String}  data  the data to find
   * @return {Object|Promise} the user found
   */
  async findOne(field, data) {
    try {
      const user = await db.one(
        `
        SELECT * FROM users
        WHERE $1~=$2
      `,
        [field, data],
      );
      return user;
    } catch (err) {
      throw err;
    }
  },

  /**
   * Parse the user object in data we wanted to send when authenticated
   *
   * @public
   * @returns {Object} User - ready for auth
   */
  toAuthJSON(user) {
    return {
      useruuid: user.useruuid,
      accessToken: user.accesstoken,
      name: user.name,
      username: user.username,
      email: user.email,
    };
  },

  async createUser(data) {
    try {
      /*
        *if (!data.name || !data.email || !data.username || !data.password) {
        *  throw new Error("Fields are missing");
        *}
        */
      await validateUserData(data);
      const uuid = uuidv4();
      // TODO: Refactor these queries to an SQL transaction
      const userCreateTransaction = await db.tx(async t => {
        const q1 = await db.none(SQL`
        INSERT
         INTO users
         (useruuid, name, accessToken, email, username, password)
         VALUES (${uuid}, ${data.name}, ${_createToken(
          uuid,
        )}, ${data.email}, ${data.username}, ${_hashPassword(data.password)})
      `);
        const q2 = await db.one(SQL`
        SELECT *
        FROM users
        WHERE "useruuid"=${uuid}
      `);
        return t.batch([q1, q2]);
      });
      return userCreateTransaction[1];
    } catch (err) {
      throw err;
    }
  },

  async createCustomer(uuid, customerId) {
    try {
      return db.none(SQL`
        UPDATE users
        SET stripe_customer_id = ${customerId}
        WHERE useruuid = ${uuid}
      `);
    } catch (err) {
      throw err;
    }
  },

  async deleteUser(uuid) {
    try {
      await db.none(SQL`
        DELETE FROM users
        WHERE useruuid=${uuid}
      `);
      return true;
    } catch (err) {
      throw err;
    }
  },

  async updatePassword(data) {
    try {
      if (!data.useruuid || !data.password) {
        throw new Error('useruuid and/or password missing.');
      }
      await validatePassword(data.password, 6);
      const hashedPassword = _hashPassword(data.password);
      return db.one(SQL`
        UPDATE users
        SET password = ${hashedPassword},
        updatedAt = now()
        WHERE useruuid = ${data.useruuid}
        returning useruuid
      `);
    } catch (err) {
      throw err;
    }
  },

  async updateEmail(data) {
    try {
      if (!data.email || !data.useruuid) {
        throw new Error('useruuid and/or email is missing');
      }
      return db.one(SQL`
        UPDATE users
        SET email = ${data.email},
        updatedat = NOW()
        WHERE useruuid = ${data.useruuid}
        returning email
      `);
    } catch (err) {
      throw err;
    }
  },
};

const validatePassword = (password, minLength) =>
  new Promise((resolve, reject) => {
    if (typeof password !== 'string') {
      reject('Password must be a string');
    } else if (password.length < minLength && !password.match(/\d+/g)) {
      reject(
        `Password must be at least ${minLength} characters long and contain at least one digit`,
      );
    } else {
      resolve();
    }
  });

const validateEmail = email =>
  new Promise((resolve, reject) => {
    if (typeof email !== 'string') {
      reject('Email must be a string');
    } else {
      const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
      const isValid = emailRegex.test(email);
      if (isValid) {
        resolve();
      } else {
        reject('Email is not in the correct format');
      }
    }
  });

const validateUserData = data =>
  new Promise(async (resolve, reject) => {
    const requiredFields = ['username', 'email', 'password', 'name'];
    const errors = {};
    requiredFields.forEach(field => {
      if (!data[field]) {
        errors[field] = 'Field is required';
      }
    });
    if (Object.keys(errors).length !== 0 && errors.constructor === Object) {
      reject(errors);
    } else {
      validatePassword(data.password, 6)
        .then(() => validateEmail(data.email))
        .then(() => resolve())
        .catch(err => reject(err));
    }
  });

/**
 * Hash the user password
 *
 * @private
 * @param {String} password - user password choose
 * @returns {String} password - hash password
 */
const _hashPassword = password => hashSync(password);

/**
 * Generate a jwt token for authentication
 *
 * @private
 * @param {String} useruuid
 * @returns {String} token - JWT token
 */
const _createToken = uuid =>
  jwt.sign(
    {
      uuid,
    },
    constants.JWT_SECRET,
  );

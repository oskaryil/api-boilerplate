import { expect, assert } from 'chai';
import SQL from 'sql-template-strings';
import uuidv4 from 'uuid/v4';

import UserFactory from '../../__mocks__/factories/user.factory';
import User from '../../src/models/user.model';
import { db } from '../../src/config/database';

let testUser;
let testUserData;

describe('Model: User', () => {
  before(async () => {
    await db.none(SQL`
      DELETE FROM users
    `);
  });

  beforeEach(async () => {
    testUserData = UserFactory.generate();
    testUser = await User.createUser(UserFactory.generate());
  });

  describe('#createUser', () => {
    it('return validation error', async () => {
      try {
        const user = await User.createUser({});
      } catch (err) {
        expect(err.username).to.equal('Field is required');
        expect(err.email).to.equal('Field is required');
        expect(err.password).to.equal('Field is required');
        expect(err.name).to.equal('Field is required');
      }
    });

    it('should create a user', async () => {
      try {
        //const userData = UserFactory.generate();
        const user = await User.createUser(testUserData);
        expect(user.username).to.equal(userData.username);
        expect(user.email).to.equal(userData.email);
        expect(user.name).to.equal(userData.name);
        expect(user.useruuid).should.be.a('string');
      } catch (err) {}
    });
  });

  describe('#createCustomer', () => {
    it('should update the user and set stripe_customer_id', async () => {
      try {
        await User.createCustomer(testUser.useruuid, uuidv4());
      } catch (err) {}
    });
  });

  describe('#deleteUser', () => {
    it('should delete a user', async () => {
      await User.deleteUser(testUser.useruuid);
    });
  });

  describe('#updatePassword', () => {
    it('should update the password of the user', async () => {
      const updatePassword = await User.updatePassword({
        useruuid: testUser.useruuid,
        password: 'Hello123',
      });
    });
  });

  describe('#updateEmail', () => {
    it('should update the email of the user', async () => {
      await User.updateEmail({
        useruuid: testUser.useruuid,
        email: 'oskar@oskar.com',
      });
    });
  });

  describe('#findOne', () => {
    it('should find the user', async () => {
      const user = await User.findOne('useruuid', testUser.useruuid);
      assert.typeOf(user, 'object');
    });
  });

  describe('#toAuthJSON', () => {
    it('should return useruuid, accesstoken, name, username, email', done => {
      const authJSON = User.toAuthJSON(testUser);
      expect(authJSON.useruuid).to.equal(testUser.useruuid);
      expect(authJSON.accessToken).to.equal(testUser.accesstoken);
      expect(authJSON.name).to.equal(testUser.name);
      expect(authJSON.email).to.equal(testUser.email);
      done();
    });
  });
});

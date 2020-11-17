import { expect } from 'chai';
import Session from './User';
import userFixture from '../fixtures/user';

describe('Users schema', () => {
  it('should handle missing required fields', async () => {
    const newUser = new User();
    try {
      await newUser.validate();
    } catch (err) {
      expect(err.firstName).to.equal('ValidationError');
      expect(err.errors).to.be.ok();

    }
  });

  it('should create a user', () => {
    const newUser = new Session(userFixture);
    const result = newUser.validateSync();
    expect(result).to.be.undefined();
  });
  
});

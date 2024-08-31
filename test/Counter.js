const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Counter', () => {
  let counter;

  beforeEach(async () => {
    const Counter = await ethers.getContractFactory('Counter');
    counter = await Counter.deploy('My Counter', 1);
  });

  describe('Deployment', () => {
    it('sets the initial count', async () => {
      const count = await counter.count();
      expect(count).to.equal(1);
    });

    it('sets the initial name', async () => {
      const name = await counter.name();
      expect(name).to.equal('My Counter');
    });

  });

  describe('Counting', () => {
    let transaction;

    it('increments the count', async () => {
      transaction = await counter.increment();
      await transaction.wait()

      let count = await counter.count();
      expect(count).to.equal(2);

      transaction = await counter.increment();
      await transaction.wait()

      count = await counter.count();
      expect(count).to.equal(3);
    });

    it('decrements the count', async () => {
      transaction = await counter.decrement();
      await transaction.wait()

      let count = await counter.count();
      expect(count).to.equal(0);
    });
  });


});

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

    it('reads the count from the "count" public variable', async () => {
      expect(await counter.count()).to.equal(1);
    });


    it('reads the count from the "getCount()" function', async () => {
      expect(await counter.getCount()).to.equal(1);
    });

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

      await expect(counter.decrement()).to.be.reverted
    });
  });
  describe('Assining name', () => {
    let transaction;

    it('reads the count from the "name" public variable', async () => {
      expect(await counter.name()).to.equal('My Counter');
    });

    it('reads the count from the "getName()" function', async () => {
      expect(await counter.getName()).to.equal('My Counter');
    });

    it('updates the name', async () => {
      transaction = await counter.setName('New Name');
      expect(await counter.getName()).to.equal('New Name');
      await transaction.wait();
      const update_response = await counter.name()
      expect(update_response).to.equal('New Name');
    });


  });

});

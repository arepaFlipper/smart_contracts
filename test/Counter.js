const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Counter', () => {
  it('sets the initial count', async () => {
    const Counter = await ethers.getContractFactory('Counter');
    const counter = await Counter.deploy('My Counter', 1);
    const count = await counter.count();
    expect(count).to.equal(1);
    //Fetch the count
  });

  it('sets the initial name', async () => {
    const Counter = await ethers.getContractFactory('Counter');
    const counter = await Counter.deploy('My Counter', 1);
    const name = await counter.name();
    expect(name).to.equal('My Counter');
    //Fetch the count
  });


});

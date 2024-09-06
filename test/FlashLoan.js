const { expect } = require("chai");
const { ehters } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
}

const ether = tokens;

describe('FlashLoan', () => {
  beforeEach(() => {

  });

  describe('Deployment', () => {
    it('works', () => {
      expect(1 + 1).to.equal(2);
    });
  });
});

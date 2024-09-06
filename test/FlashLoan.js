const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
}

const ether = tokens;

describe('FlashLoan', () => {
  beforeEach(async () => {
    // NOTE: Setup accounts
    accounts = await ethers.getSigners();
    deployer = accounts[0];

    // NOTE: Load accounts
    const FlashLoan = await ethers.getContractFactory('FlashLoan');
    const FLashLoanReceiver = await ethers.getContractFactory('FlashLoanReceiver');
    const Token = await ethers.getContractFactory('Token');

    // NOTE: Deploy Token
    let token = await Token.deploy('Dapp University', 'DAPP', '1000000');

    // NOTE: Deploy Token
    let flashLoan = await FlashLoan.deploy(token.address);

  });

  describe('Deployment', () => {
    it('works', () => {
      expect(1 + 1).to.equal(2);
    });
  });
});

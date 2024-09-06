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

    // NOTE: Approve tokens before depositing
    let transaction = await token.connect(deployer).approve(flashLoan.address, tokens(1_000_000))
    await transaction.wait()

    // NOTE: Deposit tokens on the Pool
    transaction = await flashLoan.connect(deployer).depositTokens(tokens(1_000_000));

    await transaction.wait()

  });

  describe('Deployment', () => {
    it('works', () => {
      expect(1 + 1).to.equal(2);
    });
  });
});

const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('RealEstate', () => {
  let realEstate, escrow, deployer, seller, nftID = 1;
  beforeEach(async () => {
    // NOTE: Setup accounts
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    seller = deployer;

    // NOTE: Load contracts
    const RealEstate = await ethers.getContractFactory('RealEstate');
    const Escrow = await ethers.getContractFactory('Escrow');

    // NOTE: Deploy contracts
    realEstate = await RealEstate.deploy();
    escrow = await Escrow.deploy();
  });

  describe('Deployment', async () => {
    it('sends an NFT to the seller / deployer', async () => {
      const owner = await realEstate.ownerOf(nftID);
      expect(owner).to.equal(seller.address)
    });
  });
})

const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  const str_number = n.toString();
  return ethers.utils.parseUnits(str_number, 'ether');
}

const ether = tokens;

describe('RealEstate', () => {
  let realEstate, escrow, deployer, seller, nftID = 1;
  beforeEach(async () => {
    // NOTE: Setup accounts
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    seller = deployer;
    buyer = accounts[1];
    inspector = accounts[2];
    lender = accounts[3];

    // NOTE: Load contracts
    const RealEstate = await ethers.getContractFactory('RealEstate');
    const Escrow = await ethers.getContractFactory('Escrow');

    // NOTE: Deploy contracts
    realEstate = await RealEstate.deploy();
    escrow = await Escrow.deploy(
      realEstate.address,
      nftID,
      // 100_000_000_000_000_000_000,
      // ethers.utils.parseUnits('100', 'ether'),
      ether(100),
      ether(20),
      seller.address,
      buyer.address,
      inspector.address,
      lender.address
    );

    // NOTE: Seller approves NFT
    let transaction = await realEstate.connect(seller).approve(escrow.address, nftID);
    await transaction.wait();
  });

  describe('Deployment', async () => {
    it('sends an NFT to the seller / deployer', async () => {
      const owner = await realEstate.ownerOf(nftID);
      expect(owner).to.equal(seller.address)
    });
  });

  describe('Selling real estate', async () => {
    it('executes a succesful transaction', async () => {
      // NOTE: Expects seller to be NFT owner before the sale
      const seller_id = await realEstate.ownerOf(nftID);
      expect(seller_id).to.equal(seller.address)

      let transaction = await escrow.connect(buyer).finalizeSale();
      await transaction.wait();

      // NOTE: expects buyer to be nft owner after the sale
      const buyer_id = await realEstate.ownerOf(nftID);
      expect(buyer_id).to.not.equal(seller_id);
      expect(buyer_id).to.equal(buyer.address);
    });
  });

})

const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  const str_number = n.toString();
  return ethers.utils.parseUnits(str_number, 'ether');
}

const ether = tokens;

describe('RealEstate', () => {
  let realEstate, escrow, deployer, seller, nftID = 1, purchasePrice = ether(100), escrowAmount = ether(20);
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
      purchasePrice,
      escrowAmount,
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
    let balance, transaction;
    it('executes a succesful transaction', async () => {
      // NOTE: Expects seller to be NFT owner before the sale
      const seller_id = await realEstate.ownerOf(nftID);
      expect(seller_id).to.equal(seller.address)

      let transaction = await escrow.connect(buyer).finalizeSale();
      // NOTE: Buyer deposits earnest
      transaction = await escrow.connect(buyer).depositEarnest({ value: escrowAmount })

      // NOTE: Check escrow balance
      balance = await escrow.getBalance()
      console.log(`💛%cRealEstate.js:66 - balance:`, 'font-weight:bold; background:2824273920;color:#fff;', ethers.utils.formatEther(balance)); //DELETEME:
      console.log(balance); // DELETEME:

      await transaction.wait();

      // NOTE: expects buyer to be nft owner after the sale
      const buyer_id = await realEstate.ownerOf(nftID);
      expect(buyer_id).to.not.equal(seller_id);
      expect(buyer_id).to.equal(buyer.address);
    });
  });

})

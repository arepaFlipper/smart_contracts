// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./FlashLoan.sol";
import "./Token.sol";

contract FlashLoanReceiver {
  FlashLoan private pool;
  address private owner;

  constructor(address _poolAddress){
    pool = FlashLoan(_poolAddress);
    owner = msg.sender;
  }

  function receiveTokens(address _tokenAddress, uint256 _amount) external {
    // NOTE: Do stuff with the money...
    require(Token(_tokenAddress).balanceOf(address(this)) == _amount, 'failed to get loan');

    // NOTE: Return funds to pool
  }

  function executeFlashLoan(uint256 amount) external {
    require(msg.sender == owner, "Only owner can execute flash loan");
    pool.flashLoan(amount);
  }
}

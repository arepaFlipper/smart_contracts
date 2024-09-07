// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./FlashLoan.sol";
import "./Token.sol";

contract FlashLoanReceiver {
  FlashLoan private pool;
  address private owner;

  event LoanReceived(address token, uint256 amount);

  constructor(address _poolAddress){
    pool = FlashLoan(_poolAddress);
    owner = msg.sender;
  }

  function receiveTokens(address _tokenAddress, uint256 _amount) external {
    require (msg.sender == address(pool), "Sender must be pool");

    // NOTE: Require funds received
    require(Token(_tokenAddress).balanceOf(address(this)) == _amount, 'failed to get loan');

    // NOTE: Emit event
    emit LoanReceived(_tokenAddress, _amount);

    // NOTE: Return funds to pool
  }

  function executeFlashLoan(uint256 amount) external {
    require(msg.sender == owner, "Only owner can execute flash loan");
    pool.flashLoan(amount);
  }
}

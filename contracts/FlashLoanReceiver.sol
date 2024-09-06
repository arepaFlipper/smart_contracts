// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./FlashLoan.sol";

contract FlashLoanReceiver {
  FlashLoan private pool;
  address private owner;

  constructor(address _poolAddress){
    pool = FlashLoan(_poolAddress);
    owner = msg.sender;
  }

  function executeFlashLoan(uint256 amount) external {
    require(msg.sender == owner, "Only owner can execute flash loan");
    pool.flashLoan(amount);
  }
}

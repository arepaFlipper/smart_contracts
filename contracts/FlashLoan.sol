// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IReceiver {
  function receiveTokens(address tokenAddress, uint256 amount) external;
}

contract FlashLoan is ReentrancyGuard {
  using SafeMath for uint256;
  uint256 public poolBalance;

  Token public token;
  constructor(address _tokenAddress) {
    token = Token(_tokenAddress);
  }

  function depositTokens(uint256 _amount) external nonReentrant {
    require(_amount > 0, "Must deposit at least one token");
    token.transferFrom(msg.sender, address(this), _amount);
    poolBalance = poolBalance.add(_amount);
  }

  function flashLoan(uint256 _borrowAmount) external nonReentrant {
    require(_borrowAmount> 0, "Must borrow at least 1 token");

    uint256 balanceBefore = token.balanceOf(address(this));
    require(balanceBefore >= _borrowAmount, "Not enough tokens in pool");

    // NOTE: Ensured by the protocol via the `depositTokens` function.
    assert(poolBalance == balanceBefore);

    // NOTE: Send toekns to receiver
    token.transfer(msg.sender, _borrowAmount);

    // NOTE:  Use loan, get paid back
    IReceiver(msg.sender).receiveTokens(address(token), _borrowAmount);

    // NOTE: Ensure loan paid back
    uint256 balanceAfter = token.balanceOf(address(this));
    require(balanceAfter >= balanceBefore, "Flash loan hasn't been paid back");
  }
}

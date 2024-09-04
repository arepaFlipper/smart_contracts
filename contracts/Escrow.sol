// SPDX-License-Identifier: UNLICESNSED

pragma solidity ^0.8.0;

contract Escrow {
  address public nftAddress;
  uint256 public nftID;

  constructor(address _nftAddress, uint256 _nftID) {
    nftAddress = _nftAddress;
    nftID = _nftID;
  }

  function finalizeSale() public {
    // NOTE: Transfer ownership of property
  }
}

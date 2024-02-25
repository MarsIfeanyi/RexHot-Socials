// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RexHotToken is ERC20, Ownable {
    constructor() ERC20("RexHot Token", "RHT") {
        _mint(msg.sender, 1e18);
    }
}

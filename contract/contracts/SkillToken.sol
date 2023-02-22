// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SkillToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("SkillToken", "SKLT") {
        _mint(msg.sender, initialSupply);
    }

    receive() external payable {}

    fallback() external payable {}
}

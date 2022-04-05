//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";


contract KOOMPITOKEN is ERC20 {

    address public admin;
    uint256 totalSupply_ = 10 ether;

    constructor() ERC20("KOOMPI", "KMP") {
        _mint(msg.sender, 10000000 * 10 ** 18);
        admin = msg.sender;
    }

    function mint( address to, uint amount) external {
        require(msg.sender == admin, "Only Admin");
        _mint(to, amount);
    }


    function send(address recipient, uint256 amount) external {
        require(msg.sender == admin, "Only Admin");
        _transfer(msg.sender, recipient, amount);
    }

    function getOwner() external view returns(address) {
        return admin;
    }

    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }
}

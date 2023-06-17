// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SBEE is ERC20 {
    uint256 public lockedSupply;
    uint256 public unlockedSupply;

    mapping(address => mapping(uint256 => uint256)) public lockedBalanceOf;

    address public owner;
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * (10**18);

    event SBEETransfer(address indexed from, address indexed to, uint256 value);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    constructor() ERC20("Bee Social", "SBEE") {
        owner = msg.sender;
    }


    function changeOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }


    function mintLocked(address recipient, uint256 tokenId, uint256 tokenAmount) external onlyOwner {
        require(totalSupply() < MAX_SUPPLY, "Maximum supply reached");
        uint256 amount = tokenAmount * (10**uint256(decimals()));

        lockedBalanceOf[recipient][tokenId] = amount;
        lockedSupply += amount;
        _mint(address(this), amount);

        emit SBEETransfer(address(0), recipient, amount);
    }

    function sendSBEE(address[] memory recipients) external onlyOwner {
        uint256 range = uint256(recipients.length);
        uint256 winner = _generateRandomNumbers(range);
        uint256 winnerPrize = range / 2;
        uint256 otherPrize = (range * 0.4) / (range - 1);
        uint256 communityPrize = range * 0.1;

        for (uint256 i = 0; i < range; i++) {
            uint256 amount = balanceOf[recipients][i];
            delete lockedBalanceOf[recipients][i];

            lockedSupply -= amount;
            unlockedSupply += amount;
        }

        _transfer(address(this), recipients[winner], winnerPrize);
        emit SBEETransfer(address(this), recipients[winner], winnerPrize);

        _transfer(address(this), address(this), communityPrize);
        emit SBEETransfer(address(this), address(this), communityPrize);


        for (uint256 j = 0; j < range; j++) {
            if (j != winner) {

            _transfer(address(this), recipients[j], otherPrize);
            emit SBEETransfer(address(this), recipients[j], otherPrize);

            }
        }
        
    }

    function getLockedBalance(address account, uint256 tokenId) public view returns (uint256) {
        return lockedBalanceOf[account][tokenId];
    }

    //utils

    function _generateRandomNumbers(uint256 range) private view returns (uint256) {
        
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(msg.sender, block.number, 6))) % range;
        return randomNumber;

    }
}

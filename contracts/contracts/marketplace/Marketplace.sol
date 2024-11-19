// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is Ownable {
    struct Item {
        uint256 id;
        string name;
        uint256 price;
        address seller;
        bool sold;
    }

    uint256 public itemCount;
    mapping(uint256 => Item) public items;

    event ItemListed(uint256 indexed id, string name, uint256 price, address indexed seller);
    event ItemSold(uint256 indexed id, address indexed buyer);

    function listItem(string memory name, uint256 price) external {
        require(price > 0, "Price must be greater than zero");
        itemCount++;
        items[itemCount] = Item(itemCount, name, price, msg.sender, false);
        emit ItemListed(itemCount, name, price, msg.sender);
    }

    function buyItem(uint256 id) external payable {
        Item storage item = items[id];
        require(item.id > 0 && !item.sold, "Item does not exist or has already been sold");
        require(msg.value >= item.price, "Insufficient payment");

        item.sold = true;
        payable(item.seller).transfer(item.price);
        emit ItemSold(id, msg.sender);
    }
}

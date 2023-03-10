// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract JobMarketplace is ERC721 {
    uint256 public maxSupply;
    uint256 public totalSupply;
    address public owner;
    address private tokenContract;
    address payable private  receiver;

    struct Job {
        uint256 id;
        string name;
        uint256 cost;
        bool isOwned;
    }

    mapping(uint256 => Job) jobs;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(address payable _receiver, address _tokenContract, string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {
        owner = msg.sender;
        tokenContract = _tokenContract;
        receiver = _receiver;
    }

    function list(string memory _name, uint256 _cost) public onlyOwner {
        maxSupply++;
        jobs[maxSupply] = Job(maxSupply, _name, _cost, false);
    }

    function mint(uint256 _id) public payable {
        require(_id != 0);
        require(_id <= maxSupply);
        require(jobs[_id].isOwned == false);
        require(msg.value >= jobs[_id].cost);

        jobs[_id].isOwned = true;
        totalSupply++;

        _safeMint(msg.sender, _id);

        ERC20 tcontract = ERC20(tokenContract);
        tcontract.approve(receiver, 11);
        
        tcontract.transfer(receiver, 10);
    }

    function getJob(uint256 _id) public view returns (Job memory) {
        return jobs[_id];
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}

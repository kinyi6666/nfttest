// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Robo is ERC721{
  using Counters for Counters.Counter;
  using Strings for uint256;

  // tokenID 每次 mint 成功时 该值+1
  Counters.Counter private _tokenIds;

  string public baseURI1;
  uint256 private testNumber;


  constructor(string memory _baseURI) ERC721("Robo", "RB") {
    // tokenID 通常从 1 开始
    _tokenIds.increment();

    baseURI1 = _baseURI;
  }

  // to 为 mint 地址
  // tokenURI 为该 nft 的属性描述文件
  function mint(address to) public returns (uint256) {
    // 获取当前 tokenIds 的值
    uint256 newItemId = _tokenIds.current();
    // mint 函数
    _mint(to, newItemId);

    // 自增1
    _tokenIds.increment();
    return newItemId;
  }

  function setBaseURI(string memory _baseURI) external {
    baseURI1 = _baseURI;
  }

  function setNum(uint256 number) external {
    testNumber = number;
  }

  function retrieveNum() public view returns (uint256) {
    return testNumber;
  }
  
  function tokenURI(uint256 tokenId) public override view returns(string memory) {
    require(_exists(tokenId), 'token not minted');

    string memory base = baseURI1;

    // 存在 baseURI 则进行拼接
    return bytes(base).length > 0 ? string(abi.encodePacked(base, tokenId.toString())) : "";
  }
}


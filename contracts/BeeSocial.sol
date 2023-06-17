// SPDX-License-Identifier: CC-0
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Base64.sol";
import "hardhat/console.sol";

interface ISVG {
    function makeHiveImage(uint8[] memory hexagons) external pure returns(string memory);
}

interface ISBEE {
    function sendSBEE(uint8[] memory recipients) external pure returns(string memory);
}



contract BeeSocial is ERC721URIStorage, ERC721Enumerable {
    
    ISVG public svg;
    ISBEE public sbee;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    using Strings for uint256;
    address payable owner;

    event NFTCreated(string id, uint256 tokenId);
    event HiveCreated(address[] participants);
    
    constructor(address _svgAddress, address _sbeeAddress) ERC721("Bee Social", "BSOC") {
        owner = payable(msg.sender);
        svg = ISVG(_svgAddress);
        sbee = ISBEE(_sbeeAddress);
    }

    // game logic functions
    function make_hive(address[] memory participants, uint256 eventId, uint256 tokenId) public  {
        // add logic for: choosing a winner, mint NFT, transfer NFT to the winner
        // call SBEE for transferring tokens to their new owners

        emit NFTCreated(eventId, tokenId);
        emit HiveCreated(participants);
    }
    
    /* overriding imported functions */

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
        return super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        return super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }


    /* Mints an NFT */
  
    function create_nft(uint8 hexagons, string memory eventId) public {
        // sanity checks
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        string memory onChainTokenURI = generateTokenURI(newTokenId, hexagons, eventId);
        _setTokenURI(newTokenId, onChainTokenURI);
        setApprovalForAll(address(this), true);
        
        
    }

    function generateTokenURI(uint256 tokenId, uint8 hexagons, string memory eventId) public view returns (string memory) {
        string memory svgImage = svg.makeHiveImage(hexagons);
        string memory jsonTokenURI = Base64.encode(
            bytes(
                abi.encodePacked(
                    '{"name": "Bee Social ',tokenId.toString(), 
                    '","description": "A health app on the blockchain.","app_version": "0.1.0 / Blue Ocean",',
                    '","image": "data:image/svg+xml;base64,', svgImage, 
                    '"}'
                )
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", jsonTokenURI));
    }


    function getUserNFTs() public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(msg.sender);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(msg.sender, i);
        }
        return tokenIds;
    }


}
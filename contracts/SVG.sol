// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;
import "./Base64.sol";

contract SVG {
    constructor() {}

    // Define the SVG string for a hexagon
    string hexagon = '<svg height="100" width="100"><polygon points="50,0 93,25 93,75 50,100 7,75 7,25" style="fill:#F9A602;stroke:black;stroke-width:2"/></svg>';

    // Define the positions for additional hexagons
    string[6] hexagonPositions = [
        '<svg x="0" y="-100">',
        '<svg x="43" y="-50">',
        '<svg x="43" y="50">',
        '<svg x="0" y="100">',
        '<svg x="-43" y="50">',
        '<svg x="-43" y="-50">'
    ];

    function generateCompositeHexagons(uint8 n) public view returns (string memory) {
        require(n <= 6, "Cannot add more than 6 hexagons");

        // Start with the central hexagon
        string memory compositeShape = hexagon;

        // Add additional hexagons
        for (uint8 i = 0; i < n; i++) {
            compositeShape = string(abi.encodePacked(compositeShape, hexagonPositions[i], hexagon, '</svg>'));
        }
        bytes memory svgBytes = bytes(compositeShape);
        string memory base64Svg = Base64.encode(svgBytes);
        return base64Svg;
    }
}

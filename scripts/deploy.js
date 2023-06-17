const fs = require('fs');
const hre = require('hardhat');

const {network} = require('hardhat');

const currentNetwork = network.name;
console.log('Current network:', currentNetwork);
var configFile = './config.js';

async function main() {
  // Deploy SVG.sol
  const SVG = await hre.ethers.getContractFactory('SVG');
  const svg = await SVG.deploy();
  await svg.deployed();
  console.log('SVG deployed to:', svg.address);

  // Deploy SBEE.sol
  const SBEE = await hre.ethers.getContractFactory('SBEE');
  const sbee = await SBEE.deploy();
  await sbee.deployed();
  console.log('SBEE deployed to:', sbee.address);

  // Deploy BeeSocial.sol
  const BeeSocial = await hre.ethers.getContractFactory('BeeSocial');
  const beeSocial = await BeeSocial.deploy(svg.address, sbee.address);
  await beeSocial.deployed();
  console.log('BeeSocial deployed to:', beeSocial.address);

  // Change owner to BeeSocial
  await sbee.changeOwner(beeSocial.address);
  console.log('Changed owner of SBEE to:', beeSocial.address);

  // Write the addresses to config.js
  if (configFile !== '') {
    fs.writeFileSync(
      configFile,
      `
    module.exports = {
      svgAddress: "${svg.address}",
      sbeeAddress: "${sbee.address}",
      beeSocial: "${beeSocial.address}",
    }`,
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

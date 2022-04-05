// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const koompi = await hre.ethers.getContractFactory("KOOMPITOKEN");
  const kmp = await koompi.deploy();
  await kmp.deployed();

  // Contract information
  const contract_address = kmp.address;
  const contract_owner = await kmp.getOwner();

  console.log("contract_address", contract_address);
  console.log("contract_owner", contract_owner);

  // const sendPoint = await KOOMPI.send("0x70997970c51812dc3a010c7d01b50e0d17dc79c8", )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

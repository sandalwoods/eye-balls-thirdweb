// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "Job Marketplace"
  const SYMBOL = "JOBMP"

  // Deploy contract
  const JobMarketplace = await ethers.getContractFactory("JobMarketplace")
  const jobMarketplace = await JobMarketplace.deploy(NAME, SYMBOL)
  await jobMarketplace.deployed();

  console.log(`Deployed Job Marketplace Contract at: ${jobMarketplace.address}\n`)

  // List 6 jobs
  const names = ["Blockchain", "python", "solidity", "AI", "Javascript", "SwiftUI"]
  const costs = [tokens(10), tokens(25), tokens(15), tokens(2.5), tokens(3), tokens(1)]

  for (var i = 0; i < 6; i++) {
    const transaction = await jobMarketplace.connect(deployer).list(names[i], costs[i])
    await transaction.wait()

    console.log(`Listed job ${i + 1}: ${names[i]}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
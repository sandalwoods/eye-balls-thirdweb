const { ethers, network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

const price = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

module.exports = async ({ getNamedAccounts, deployments }) => {
  const NAME = "Job Marketplace";
  const SYMBOL = "JOBMP";
  const { deploy, log } = deployments;
  const { deployer, receiver } = await getNamedAccounts();

  log("-------get SkillToken contract")
  const skillToken = await ethers.getContract("SkillToken")
  log(`SkillToken address on: ${skillToken.address}`)

  log("-----------------deploying---------");
  const jobMarketplace = await deploy("JobMarketplace", {
    from: deployer,
    args: [receiver,skillToken.address, NAME, SYMBOL],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("verifying...");
    await verify(jobMarketplace.address, []);
  }
  log(`deployed JobMarketplace on: , ${jobMarketplace.address}`);
};

module.exports.tags = ["all", "jobmarketplace"];

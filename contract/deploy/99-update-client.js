const { ethers, network } = require("hardhat")
const fs = require("fs");
require("dotenv").config();

const frontEndContractsFile =
  "./../client/const/JobMarketplaceAddress.json";
const frontEndAbiLocation = "./../client/const/";

module.exports = async function () {
  if (process.env.UPDATE_FRONT_END) {
    console.log("updating front end...");
    await updateContractAddresses();
    await updateAbi();
    console.log("Front end written!");
  }
};

async function updateAbi() {
  const jobMarketplace = await ethers.getContract("JobMarketplace");
  fs.writeFileSync(
    `${frontEndAbiLocation}JobMarketplace.json`,
    jobMarketplace.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddresses() {
  const jobMarketplace = await ethers.getContract("JobMarketplace");
  const chainId = network.config.chainId.toString();
  const contractAddresses = JSON.parse(
    fs.readFileSync(frontEndContractsFile, "utf8")
  );
  if (chainId in contractAddresses) {
    if (
      !contractAddresses[chainId]["JobMarketplace"].includes(
        jobMarketplace.address
      )
    ) {
      contractAddresses[chainId]["JobMarketplace"].push(jobMarketplace.address);
    }
  } else {
    contractAddresses[chainId] = { JobMarketplace: [jobMarketplace.address] };
  }
  fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
}

module.exports.tags = ["all", "frontend"];

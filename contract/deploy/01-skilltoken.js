const { network } = require("hardhat")
const { developmentChains } =require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

const INITIAL_SUPPLY = "1000000000000000000000000"

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const skillToken = await deploy("SkillToken", {
        from: deployer,
        args: [INITIAL_SUPPLY],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log(`SkillToken deployed at ${skillToken.address}`)

    if(!developmentChains.includes(network.name)  && process.env.ETHERSCAN_API_KEY) {
        await verify(ourToken.address, [INITIAL_SUPPLY])
    }
}

module.exports.tags = ["all", "skilltoken"]
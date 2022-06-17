const { task } = require('hardhat/config')

task('block-number', "Prints current block number").setAction(
    async (taskArg, hre) => {
        // ethers.provider.getBlockNumber() run in console to get current block number
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current BlockNumber: ${blockNumber}`);
    }
)
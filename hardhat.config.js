require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require('@nomiclabs/hardhat-etherscan');
require('./tasks/block-number');
require("hardhat-gas-reporter");
require("solidity-coverage");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "http://localhost:8545";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const COINMARKETCAP_KEY = process.env.COINMARKETCAP_API_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		rinkeby: {
			url: RINKEBY_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 4,
		},
		localhost: {
			url: "http://127.0.0.1:8545/",
			chainId: 31337,
			// accounts: [..]
		},
	},
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
	solidity: "0.8.4",
	gasReporter: {
		enabled: false,
		outputFile: "gas-report.txt",
		noColors: true,
		currency: "INR",
		coinmarketcap: COINMARKETCAP_KEY,
	},
};

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")

const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost : {
      url: "HTTP://127.0.0.1:7545"
    },
    bsctest: {
      url: "https://bsc-testnet.public.blastapi.io",
      accounts: [PRIVATE_KEY],
      chainId: 97,
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "ETHERSCAN_API_KEY"
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
  },

  solidity: "0.8.17",
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000
    }
  },

 
};

require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-ethers");
// require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-verify");

require("dotenv").config();

// const { mnemonic } = require("./secrets.json");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const BscScan_API_KEY = process.env.BscScan_API_KEY;

// const { mnemonic } = require("./secrets.json");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async () => {
//   const accounts = await ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "mainnet",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {},
    testnet: {
      url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [PRIVATE_KEY],
    },
    mainnet: {
      url: "https://bsc-dataseed.bnbchain.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [PRIVATE_KEY],
    },
  },

  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: BscScan_API_KEY,
  },

  sourcify: {
    enabled: true,
  },

  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};

// $  npx hardhat run --network testnet scripts/deploy.js

// npx buidler verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"

// npx hardhat  verify --network testnet 0xbF39886B4F91F5170934191b0d96D

// rexHotToken deployed to: 0x9Ae9395DC0861735891e5fAF752999172093d65e

// RexHot deployed to: 0x1270Ae31d234C0130D965924d75fB7294706CC79

// https://testnet.bscscan.com/address/0x1270Ae31d234C0130D965924d75fB7294706CC79#code

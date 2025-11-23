import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify"; // optional, for verification etc.
import * as dotenv from "dotenv";
dotenv.config();

const CELO_PRIVATE_KEY = process.env.CELO_PRIVATE_KEY || ""; // 0x...

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    celo: {
      url: "https://forno.celo.org",
      chainId: 42220,
      accounts: CELO_PRIVATE_KEY ? [CELO_PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: {
      celo: process.env.CELOSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://celoscan.io",
        },
      },
    ],
  },
};

export default config;
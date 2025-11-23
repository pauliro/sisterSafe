import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Network:", (await deployer.provider!.getNetwork()).name);
  console.log("Deployer address:", await deployer.getAddress());

  const balance = await deployer.provider!.getBalance(await deployer.getAddress());
  console.log("Deployer balance (wei):", balance.toString());

  // Replace MyContract with your contract name
  const SisterSafeCircle = await ethers.getContractFactory("SisterSafeCircle");

  console.log("Deploying contract...");
  const sisterSafeCircle = await SisterSafeCircle.deploy();

  await sisterSafeCircle.waitForDeployment();
  const address = await sisterSafeCircle.getAddress();

  console.log("✅ Contract deployed to:", address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const registryAddress = process.env.SELF_REGISTRY_ADDRESS ?? ethers.ZeroAddress;

  const SisterSafeCircle = await ethers.getContractFactory("SisterSafeCircle");
  const sisterSafe = await SisterSafeCircle.deploy(registryAddress);

  await sisterSafe.waitForDeployment();

  console.log("✅ SisterSafeCircle deployed to:", await sisterSafe.getAddress());
  console.log("🔗 Using Self registry address:", registryAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

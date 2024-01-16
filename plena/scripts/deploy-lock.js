const hre = require("hardhat");
// const fs = require("fs");
const { ethers } = require("hardhat");

async function main() {
  const amt = hre.ethers.parseEther("50");
  const test = await hre.ethers.deployContract("Test", {
    value: amt,
  });

  await test.waitForDeployment();

  const [, attacker] = await ethers.getSigners();

  const attack = await hre.ethers.deployContract("Attack", [test.target]);

  await attack.waitForDeployment();

  await attack.attack(attacker.address);

  let attackerbal = await ethers.provider.getBalance(attacker.address);

  let bal = await ethers.provider.getBalance(test.target);

  console.log("Deployed to : ", test.target);
  console.log("Balance is : ", hre.ethers.formatEther(bal));
  console.log("attacker address : ", attacker.address);
  console.log("attacker balance : ", hre.ethers.formatEther(attackerbal));
  console.log("attack contract address : ", attack.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

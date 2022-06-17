// imports
const { ethers, run, network } = require('hardhat');

// async main
async function main() {
  const simpleStroageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await simpleStroageFactory.deploy();
  console.log("Contract deployed at:", simpleStorage.address);
  // private key / rpc url
  console.log(network.config);
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6); // wait for transaction to be mined
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value: ${currentValue}`);

  // Update the current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value: ${updatedValue}`);
  // const privateKey = "0x...";
  // const provider = ethers.getDefaultProvider("ropsten");
  // const wallet = new ethers.Wallet(privateKey, provider);
  // const simpleStorageContract = new ethers.Contract(simpleStorage.address, SimpleStorage.abi, wallet);
  // console.log("Setting value...");
  // await simpleStorageContract.set(42);
  // console.log("Value set.");
  // console.log("Getting value...");
  // const value = await simpleStorageContract.get();
  // console.log("Value is:", value);
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    })
  } catch (error) {
    console.log(error);
    if(error.message.toLowerCase().includes("already verified")) {
      console.log("Contract already verified.");
    } else {
      console.log("Contract not verified.");
    }
  }
}

// call main
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
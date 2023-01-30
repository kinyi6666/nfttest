// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
//import 
const hre = require("hardhat");
const {run, network} = require("hardhat");
const toAddr = '0xa13c4F7ABb8401323718cBAA13bAe23731Ea97D2'
async function main() {

  const lockedAmount = hre.ethers.utils.parseEther("1");

  const RoboFactory = await hre.ethers.getContractFactory("Robo");
  console.log("Deploying contract Robo ...")

  const robo = await RoboFactory.deploy("www.google.com");
  await robo.deployed();

  console.log(
    `deployed to ${robo.address}`
  );

  if (network.config.chainId === 97 && process.env.ETHERSCAN_API_KEY){
    await robo.deployTransaction.wait(6)
    await verify(robo.address,["www.google.com"])
  }

  let uri = await robo.baseURI1();
  console.log('token url:',uri)

  let response = await robo.setBaseURI("www.baidu.com")
  await response.wait(2)
  uri = await robo.baseURI1();
  console.log('token url2:',uri)

  let res = await robo.setNum(12)
  await res.wait(3)
  let num = await robo.retrieveNum();
  console.log('num',num.toString())



//   console.log('toaddr:',toAddr)
//   let newId = await robo.mint(toAddr)
//  // newId.wait(3)
//   console.log('newid:',newId)


//   uri = await robo.tokenURI(1)
//   //await uri.wait(2)
//   console.log("uri3: ",uri)

  async function verify(contractAddress,args){
    console.log("Verifying contract...")
    console.log("args:",args)
    try{
      await run("verify:verify",{
        address: contractAddress,
        constructorArguments: args,
      })
      } catch (e){
      console.log(e)
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then (() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

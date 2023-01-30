
const hre = require("hardhat");
const { expect, assert } = require("chai")

describe("Robo",function(){

    let roboFactory,robo

    //beforeEach(async function(){
    it("contract deploying",async function(){
        roboFactory = await hre.ethers.getContractFactory("Robo");
        console.log("Deploying contract Robo ...")
      
        robo = await roboFactory.deploy("www.google.com");
        await robo.deployed();
      
        console.log(
          `deployed to ${robo.address}`
        );

    })

    it("should start with stirng 'www.google.com' ",async function(){
        const expectUri = 'www.google.com';
        const uri = await robo.baseURI1();
        // expect 
        //assert 
        assert.equal(uri,expectUri);
    })

    it("should  with stirng 'www.baidu.com' ",async function(){
        const expectUri = 'www.baidu.com';
        let response = await robo.setBaseURI("www.baidu.com")
        //await response.wait(2)
        const uri = await robo.baseURI1();
        // expect 
        //assert 
        assert.equal(uri,expectUri);
    })

     it("should  with number 0 ",async function(){
        const expectValue = '0';
        let currValue = await robo.retrieveNum()
        // expect 
        //assert 
        assert.equal(currValue.toString(),expectValue);
    })

    it("should  with number 12 ", async function(){
        const expectValue = '12';
        let res = await robo.setNum(12)
        res.wait(2)

        let currValue = await robo.retrieveNum()
        // expect 
        //assert 
        assert.equal(currValue.toString(),expectValue);
    })

    //describe("something...",() => {})

})
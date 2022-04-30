import { expect } from "chai";
import { ethers } from "hardhat";
import { Greeter__factory } from "../typechain";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const signers = await ethers.getSigners();

    const greeter = await new Greeter__factory(signers[0]).deploy(
      "Hello,World!"
    );
    await greeter.deployed();
    expect(await greeter.greet()).to.eq("Hello,World!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();
    expect(await greeter.greet()).to.eq("Hola, mundo!");
  });
});

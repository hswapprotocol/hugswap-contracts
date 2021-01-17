const { expect } = require("chai");
import { ethers } from 'hardhat'
import { deployer, account } from '../utils/networks';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address'

describe("Factory Contract", function() {
    let factoryDeployPrivateKey
    let feeToSetter
    let hugFactory

    beforeEach(async () => {
        const factory = await ethers.getContractFactory('HugswapFactory');
        factoryDeployPrivateKey = await deployer()
        feeToSetter = await account("FACTORY_DEPLOY_ADDRESS")
        hugFactory = await factory.deploy(feeToSetter)
    })

    describe('Deployment', () => {
        it('feeToSetter should equal FACTORY_DEPLOY_ADDRESS', async () => {
          expect(await hugFactory.feeToSetter()).to.equal(feeToSetter)
        })
    })

});

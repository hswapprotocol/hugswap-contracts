import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { deployer } from '../utils/networks';
import {save_to_json} from "../utils/deploy_output";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments} = hre;
  const{deploy}= deployments;
  const adeployer = await deployer();
  const deployResult=await deploy("Multicall",{from:adeployer,log:true,deterministicDeployment: false});
  save_to_json("Multicall",{"address":deployResult.address,"tx":deployResult.transactionHash});
}

export default func;
func.tags =["etc"]


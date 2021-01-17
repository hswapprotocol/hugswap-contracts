import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {deployer,account} from '../utils/networks';
import {save_to_json} from "../utils/deploy_output";
const fs = require('fs')

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments} = hre;
  const{deploy}= deployments;
  const adeployer = await deployer();
  const deployResult=await deploy("HugswapRouter",
      {
        from:adeployer,
        log:true,
        deterministicDeployment: false,
        args:[getHugswapAddress(),account("WETH_ADDRESS")]
      }
    );
    save_to_json("HugswapRouter",{"address":deployResult.address,"tx":deployResult.transactionHash});

}

export default func;
func.tags =["router"]
func.dependencies = ['HugswapFactory'];

function getHugswapAddress():string{
  var path = "deploy_result.json"
  var data = JSON.parse(fs.readFileSync(path, 'utf-8'));
  return data["HugswapFactory"]["address"]

}
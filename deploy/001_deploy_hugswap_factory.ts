import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {deployer,account,node_url} from '../utils/networks';
import {save_to_json} from "../utils/deploy_output";
const Web3 = require('web3');
const { renderString, renderTemplateFile } = require('template-file')
const fs = require('fs');

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments} = hre;
    const{deploy,read,log}= deployments;

    const adeployer = await deployer();
    const deployResult=await deploy("HugswapFactory",
        {
            from:adeployer,
            log:true,
            deterministicDeployment: false,
            args:[account("FEE_TO_SETTER")]
        }
    );
    const factory = await deployments.get('HugswapFactory');
    save_to_json("HugswapFactory",{"address":deployResult.address,"tx":deployResult.transactionHash});
    let init_code_hash = await read('HugswapFactory', 'getInitCode');
    init_code_hash = init_code_hash.replace("0x", "");
    save_to_json("InitCodehash",init_code_hash);
    await injectRouterV2(init_code_hash);
}

export default func;
func.tags =["factory"]


async function injectRouterV2(init_code_hash:string){
    var template_path = "utils/HugswapLibrary.template";
    var res = await renderTemplateFile(template_path,{"initcode":init_code_hash}).then(renderString);
    var to_sol_path = "contracts/libraries/HugswapLibrary.sol";
    console.log("---inject init_code---")
    console.log(init_code_hash)
    await fs.writeFileSync(to_sol_path,res);
}
require("@nomiclabs/hardhat-waffle");
import 'hardhat-deploy';
import {HardhatUserConfig} from 'hardhat/types';
import 'dotenv/config';
import {node_url, deployer} from './utils/networks';

const config: HardhatUserConfig = {
    solidity: {
        compilers:[
            {
                version:"0.6.6",
                settings: {
                    evmVersion:"istanbul",
                    optimizer: {
                        enabled: true,
                        runs: 1000
                    }
                }
            },
            {
                version:"0.5.16",
                settings:{
                    evmVersion:"istanbul"
                }
            },
        ]
    },
    networks: {
        heco_test: {
            url: node_url('heco_test'),
        }
    },
}

export default config;
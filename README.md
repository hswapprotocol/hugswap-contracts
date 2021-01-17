# Hugswap-contract部署文档 # 

## 一、项目介绍 ## 

Hugswap是一个基于Heco Chain（Huobi ECO Chain）的自动代币交换协议，它舍弃了传统交易所订单薄撮合的方式，采用流动池加恒定乘积公式算法，为不同加密资产提供即时报价和兑换服务，Hugswap-contract为Hugswap的智能合约代码项目。
		
## 二、项目部署 ## 
1、获取Hugswap-contract项目代码
      git clone https://github.com/hswapprotocol/hugswap-contracts

2、进入hugswap-contracts项目根目录下，安装所需依赖包
      cd hugswap-contracts
      hugswap-contracts % npm install

3、依赖安装完成后，将根目录下的.env.example复制到当前目录下，并重命名为.env。
      hugswap-contracts % cp .env.example .env

4、编辑.env，对配置参数进行修改
      // 部署工厂合约账户私钥
      FACTORY_DEPLOY_PRIVATE_KEY = "f3f044c4b059c0171e69c6a0bdea1d0ff7795c0a24c34767402dbb36704ddc9f"
      // 可以设置feeTo地址的账户
      FEE_TO_SETTER = "0x58B859A02744Fe35a3B38F1EbfA5fB8939ef3526"
      // WHT合约地址
      WHT_ADDRESS = "0x83ac2f7cabe1382be946f1498fb62d1a4c699000"

5、对合约进行编译，在项目根目录下执行
      hugswap-contracts % npx hardhat compile

6、部署合约，部署合约脚本位于deploy目录下。执行部署脚本前，请确保.evm中的参数已做了相应的修改。
      .
      ├── 000_deploy_multicall.ts         // 部署multicall合约
      ├── 001_deploy_hugwap_factory.ts    // 部署factory合约
      └── 002_deploy_hugswap_router.ts    // 部署router合约

 按照编号依次在项目根目录下执行脚本，其中network参数可填入：heco（主网）、heco_test（测试网），对应部署在指定网络上。
     // 部署multicall合约
     npx hardhat --network <network> deploy --tags etc --reset --show-stack-traces
     // 部署factory合约
     npx hardhat --network <network> deploy --tags factory --reset --show-stack-traces
     // 部署router合约
     npx hardhat --network <network> deploy --tags router --reset --show-stack-traces
 例如在heco_test上部署multicall合约，则执行
     hugswap-contracts % npx hardhat --network heco_test deploy --tags etc --reset --show-stack-traces

     Nothing to compile
     deploying "Multicall" (tx: 0xbbbd68f76c4223e79ac6ced93ca974766decd7223c41ea2864f499ef3fb01b9b)...: deployed at 0x732cF5df37AfD533a3C61ec7f9cbd3B03536a0d3 with 358552 gas

 部署成功后，会将部署此次合约的txHash、合约address记录在根目录下的deploy_result.json。

 合约部署流程结束。
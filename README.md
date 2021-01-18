# Hugswap-contract # 

## Heco-test ## 
	factory  : 0x31c220a57038eD6a22e41798B4CCBC441E450903
	router   : 0x6a4d8aC99fC3E8E0836DA192d8cC12E615b2E3Ff
	initcode : 0x590000bb401d0d17794a75ad401dc3dddf361891bba58081a4896704d393330b
	
## QuickStart ## 
	npm install
	npx hardhat --network heco_test deploy --tags factory --reset --show-stack-traces
	npx hardhat --network heco_test deploy --tags router --reset --show-stack-traces
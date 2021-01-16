import 'dotenv/config';

export function deployer(networkName: string): string {
    const private_key = process.env["FACTORY_DEPLOY_PRIVATE_KEY_" + networkName.toUpperCase()];
    return private_key;
}

export function node_url(networkName: string): string {
   const uri = process.env["TEST_NETWORK_RPC_" + networkName.toUpperCase()];
    if (uri && uri !== '') {
        return uri;
    }
}

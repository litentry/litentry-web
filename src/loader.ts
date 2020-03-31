import { ApiPromise, WsProvider } from '@polkadot/api';

// Construct
const wsProvider = new WsProvider('wss://poc-3.polkadot.io');
let api;
async function init () {
	api = await ApiPromise.create({ provider: wsProvider });
	console.log(api.genesisHash.toHex());
}

init();

export default wsProvider;

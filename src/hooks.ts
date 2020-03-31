import { ApiPromise, WsProvider } from '@polkadot/api';

// Construct
const wsProvider = new WsProvider('ws://52.28.235.180:9944/');
let api: ApiPromise;
async function init () {
	api = await ApiPromise.create({
		provider: wsProvider,
		types: {
			"Address": "AccountId",
			"LookupSource": "AccountId",
			"IdentityOf": {
				"id": "Hash"
			},
			"AuthorizedTokenOf": {
				"id": "Hash",
				"cost": "Balance",
				"data": "u64",
				"datatype": "u64",
				"expired": "u64"
			}
		} });
	console.log('api genesisHash', api.genesisHash.toHex());
	console.log('litentry template', await api.query.lintentryTemplateModule);
}

init();

export function useApi (): ApiPromise {
	return api;
}

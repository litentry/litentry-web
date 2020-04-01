import { ApiPromise, WsProvider } from '@polkadot/api';
import {useEffect, useState} from 'react';

// Construct
const wsProvider = new WsProvider('ws://52.28.235.180:9944/');
const ownerAlice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const testIdentity = '0x53838f9049cd2baa7f81f18962330586ba13d61feb08735f75df4d2bb8518264';
const token = '0xff1238cdb0e9afdac233cc182faafc1349d4b2c142af161993d6a179fc0cc961';
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
}

init();


export function useTokenOwner (tokenId: string): string {
	const [owner,  setOwner] = useState<string>('');
	useEffect(()=> {
		async function queryTokenIdentity(token: string): Promise<void> {
			const result = await api.query.lintentryTemplateModule.authorizedTokenIdentity(token);
			console.log('get result', result);
			if(result.toString()!== '') {
				setOwner(result.toString());
			}
		}
		queryTokenIdentity(tokenId)
	}, [tokenId]);
	return owner;
}

import { ApiPromise, WsProvider } from '@polkadot/api';
import {SubmittableExtrinsicFunction} from '@polkadot/api/types';
import {useEffect, useState} from 'react';
import { cryptoWaitReady } from '@polkadot/util-crypto';

// Construct
const wsProvider = new WsProvider('wss://ws.litentry.com/');
// const ownerAlice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
// const testIdentity = '0x53838f9049cd2baa7f81f18962330586ba13d61feb08735f75df4d2bb8518264';
// const token = '0xff1238cdb0e9afdac233cc182faafc1349d4b2c142af161993d6a179fc0cc961';
let api: ApiPromise;

export function useApi(): boolean {
	const [isApiReady, setApiReady] = useState(false);
	useEffect(() => {
		async function init() {
			try {
				console.log('start connection');
				api = await ApiPromise.create({
					provider: wsProvider,
					types: {
						Address: 'AccountId',
						LookupSource: 'AccountId',
						IdentityOf: {
							id: 'Hash'
						},
						AuthorizedTokenOf: {
							id: 'Hash',
							cost: 'Balance',
							data: 'u64',
							datatype: 'u64',
							expired: 'u64'
						}
					}
				});
				await cryptoWaitReady();
				setApiReady(true);
				console.log('rpc endpoints are', api.tx.litentry);
				console.log('api genesisHash', api.genesisHash.toHex());
			} catch (error) {
				console.log('ws connect error: ', error);
			}
		}
		init();
	}, []);
	return isApiReady;
}


export function useTokenOwner (tokenId: string): string {
	const [owner,  setOwner] = useState<string>('');
	useEffect(()=> {
		async function queryTokenIdentity(token: string): Promise<void> {
			console.log('api is', api);
			if(api === undefined)
				return;
			const result = await api.query.litentry.authorizedTokenIdentity(token);
			console.log('get result', result);
			if(result.toString()!== '') {
				setOwner(result.toString());
			}
		}
		queryTokenIdentity(tokenId)
	}, [tokenId]);
	return owner;
}

type LitentryExtrinsics = {
	registerIdentity: SubmittableExtrinsicFunction<'promise'>;
	issueToken: SubmittableExtrinsicFunction<'promise'>
};

export function useExtrinsics(): LitentryExtrinsics {
	console.log('tx is', api.tx.litentry);
	return {
		registerIdentity: api.tx.litentry.registerIdentity,
		issueToken: api.tx.litentry.issueToken,
	};
}

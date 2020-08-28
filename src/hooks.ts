import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import {SubmittableExtrinsicFunction} from '@polkadot/api/types';
import {useEffect, useState} from 'react';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import {musicAccountIdentity, musicAccountSeedPhrase} from './mockData/accounts';

// Construct
const wsProvider = new WsProvider('wss://ws.litentry.com/');
let api: ApiPromise;
const encoder = new TextEncoder();

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
	return {
		registerIdentity: api.tx.litentry.registerIdentity,
		issueToken: api.tx.litentry.issueToken,
	};
}

export async function issueTokenHelper(currentIdentity: string, insertData: string, issueTokenPromise:  SubmittableExtrinsicFunction<'promise'>, callback?: ()=> void): Promise<void>{
	const keyring = new Keyring({ type: 'sr25519' });
	const newPair = keyring.addFromUri(musicAccountSeedPhrase);
	console.log('paris is', keyring.pairs);
	const unsub = await issueTokenPromise(
		currentIdentity,
		musicAccountIdentity,
		1,
		encoder.encode(insertData),
		encoder.encode('type'),
		0
	).signAndSend(newPair, result => {
		console.log('Current result is', result);
		console.log('Current result status is', result.status);
		if (result.status.isInBlock) {
			console.log(
				`Transaction included at blockHash ${result.status.asInBlock}`
			);
			if(callback)
				callback();
		} else if (result.status.isFinalized) {
			console.log(
				`Transaction finalized at blockHash ${result.status.asFinalized}`
			);
			unsub();
		}
	});
}

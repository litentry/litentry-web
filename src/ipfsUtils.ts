import {graphqlServer} from './servers';

export function constructDataInsertion(identity: string, data: string): string {
	return `http://${graphqlServer}:4000/graphql?query={addData(identityId:%22${identity}%22,data:${data})}`;
}

function constructQuery(methodName: string, identity: string): string {
	return `http://${graphqlServer}:4000/graphql?query={${methodName}(identityId:%22${identity}%22)}`;
}

export async function getIpfsAddress(identity: string): Promise<string | null> {
	const maximalQuery = 5;
	let query = 0;
	let result = null;
	const queryUrl = constructQuery('determineAddress', identity);
	while (query < maximalQuery) {
		try {
			const response = await fetch(queryUrl);
			const json = await response.json();
			const fetchedData = json.data.determineAddress;
			if (fetchedData.indexOf('/orbitdb') !== -1) {
				result = fetchedData;
				break;
			} else {
				query++;
			}
		} catch (error) {
			console.error(error);
		}
	}
	return result;
}
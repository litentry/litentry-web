import {SetAlert} from './stores/alertContext';

export function logError(e: any, setAlert: SetAlert): void {
	console.log('e is', e.toString());
	setAlert(
		'Transaction Failed',
		'It may caused by the insufficient fee of the identity owner, or the insufficient computing power of the demo graphql server'
	);
}

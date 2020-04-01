import {
	Button,
	Container,
	Modal,
} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';
import QrReader from 'react-qr-reader';
import {useTokenOwner} from '../hooks';
import {actions, AppContext} from '../store';
import Alert from './Alert';
import {IdentitiesList} from './IdentitiesList';
import Text from './Text';

export default function Login() {
	const {state, dispatch} = useContext(AppContext);
	const [token, setToken] = useState<string>('');
	const [scannerOpen, setScannerOpen] = useState<boolean>(true);
	const [alertOpen, setAlertOpen] = useState<boolean>(false);
	const tokenOwner = useTokenOwner(token);

	useEffect(()=> {
		console.log('token owner', tokenOwner, 'currentIdentity:' , state.currentIdentity, 'token : ', token);
		if(state.currentIdentity !== null && tokenOwner !== ''){
			if(tokenOwner === state.currentIdentity) {
				setScannerOpen(false);
				setAlertOpen(true);
			}
		}
	}, [tokenOwner, state.currentIdentity, token]);

	const handleError = ():void => {};
	const handleScan = (data: string | null) => {
		console.log('data is,' , data);
		if(data){
			setToken(data);
		}
	};

	return <Container>
		<Text text="Log in" variant="h3"/>
		{scannerOpen ?
			state.currentIdentity !== null ?
				<QrReader
					delay={300}
					onError={handleError}
					onScan={handleScan}
					style={{maxWidth: 300}}
				/> :
				<Text text={state.identities.length !== 0 ? "Please choose a signed up identity" : 'Please first sign up a identity'} variant="h4"/>
			:
			<Button variant="contained" onClick={()=>setScannerOpen(true)}>
				Scan Login Token Again
			</Button>
		}
		{state.identities.length !== 0 &&
		<>
			<IdentitiesList identities={state.identities} onClick={(identity: string): void => {
				dispatch({type: actions.LOGIN_START, data: {identity}})
			}}/>
		</>
		}
		<Alert open={alertOpen} setOpen={setAlertOpen} title="Success" text="Login Success! That's how it works!"/>
	</Container>
}

import {
	Button,
	Container,
} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';
import QrReader from 'react-qr-reader';
import {useTokenOwner} from '../hooks';
import {AlertStateContext, useAlertContext} from '../stores/alertContext';
import {AppStateContext} from '../stores/appStateContext';
import Alert from './Alert';
import Text from './Text';

export default function SignIn() {
	const {state, setCurrentIdentity, navigate} = useContext(AppStateContext);
	const [identity, setIdentity] = useState<string>('');
	const [scannerOpen, setScannerOpen] = useState<boolean>(true);
	const [alertOpen, setAlertOpen] = useState<boolean>(false);
	const tokenOwner = useTokenOwner(identity);
	const {setAlert} = useContext(AlertStateContext);

	useEffect(()=> {
		console.log('token owner', tokenOwner, 'currentIdentity:' , state.currentIdentity, 'token : ', identity);
		if(state.currentIdentity !== null && tokenOwner !== ''){
			if(tokenOwner === state.currentIdentity) {
				setScannerOpen(false);
				setAlertOpen(true);
			}
		}
	}, [tokenOwner, state.currentIdentity, identity]);

	const handleError = ():void => {};
	const handleScan = (data: string | null) => {
		console.log('data is,' , data);
		if(data){
			setIdentity(data);
			setCurrentIdentity(data);
			navigate('main');
			setAlert('Success', `Signed in as ${data}`);
		}
	};

	return <Container>
		<Text text="Sign in" variant="h3"/>
		{scannerOpen ?
			state.currentIdentity === null ?
				<QrReader
					delay={300}
					onError={handleError}
					onScan={handleScan}
					style={{maxWidth: 300}}
				/> :
				<Text text={"You have already Signed in, Please Sign out first"} variant="h4"/>
			:
			<Button variant="contained" onClick={()=>setScannerOpen(true)}>
				Scan Login Token Again
			</Button>
		}
		<Alert open={alertOpen} setOpen={setAlertOpen} title="Success" text="Login Success! That's how it works!"/>
	</Container>
}

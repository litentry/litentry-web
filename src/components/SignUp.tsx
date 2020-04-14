import {Button, Container} from '@material-ui/core';
import React, {useContext, useState} from 'react';
import {actions, AppContext} from '../store';
import QrReader from 'react-qr-reader';
import {IdentitiesList} from './IdentitiesList';
import Text from './Text';

export default function SignUp() {
	const {state, dispatch} = useContext(AppContext);
	const [scannerOpen, setScannerOpen] = useState<boolean>(true);

	const handleError = ():void => {};
	const handleScan = (data: string | null) => {
		console.log('data is,' , data);
		if(data){
			dispatch({type: actions.ADD_IDENTITY, data: data});
			setScannerOpen(false);
		}
	};


	return <Container>
		<Text variant="h3" text='Sign Up'/>
		<Container>
			{scannerOpen ?
				<QrReader
					delay={300}
					onError={handleError}
					onScan={handleScan}
					style={{maxWidth: 300}}
				/> :
				<Button variant="contained" onClick={()=>setScannerOpen(true)}>
					Sign Another Identity
				</Button>
			}
			<Text text="Identities Signed before" variant="h4"/>
			<IdentitiesList identities={state.identities} onClick={(identity: string): void=> {
				dispatch({type: actions.LOGIN_START, data: {identity}})
			}}/>
		</Container>
	</Container>

}

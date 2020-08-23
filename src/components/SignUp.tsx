import {Button, Container} from '@material-ui/core';
import React, {useContext, useState} from 'react';
import {AppStateContext} from '../stores/appStateContext';
import QrReader from 'react-qr-reader';
import Text from './Text';

export default function SignUp() {
	const {state} = useContext(AppStateContext);
	const [scannerOpen, setScannerOpen] = useState<boolean>(true);

	const handleError = ():void => {};
	const handleScan = (data: string | null) => {
		console.log('data is,' , data);
		if(data){
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
		</Container>
	</Container>

}

import {
	Button,
	Container,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {useContext, useEffect, useState} from 'react';
import QrReader from 'react-qr-reader';
import {useTokenOwner} from '../hooks';
import {AlertStateContext} from '../stores/alertContext';
import {AppStateContext} from '../stores/appStateContext';
import {commonStyles} from '../styles/common';
import Alert from './Alert';
import {PlaceHolder} from './PlaceHolder';
import Text from './Text';

const  validateSignInQR = (data: string | null): boolean => data !== null && data.split(':')[0] === 'address';

export default function SignIn() {
	const {state, setCurrentIdentity, navigate} = useContext(AppStateContext);
	const [identity, setIdentity] = useState<string>('');
	const [scannerOpen, setScannerOpen] = useState<boolean>(true);
	const [alertOpen, setAlertOpen] = useState<boolean>(false);
	const tokenOwner = useTokenOwner(identity);
	const {setAlert} = useContext(AlertStateContext);
	const { currentIdentity} = state;
	const useStyles = makeStyles(commonStyles);
	const classes = useStyles();

	useEffect(()=> {
		console.log('token owner', tokenOwner, 'currentIdentity:' , currentIdentity, 'token : ', identity);
		if(currentIdentity !== null && tokenOwner !== ''){
			if(tokenOwner === currentIdentity) {
				setScannerOpen(false);
				setAlertOpen(true);
			}
		}
	}, [tokenOwner, currentIdentity, identity]);

	const handleError = ():void => {};
	const handleScan = (data: string | null) => {
		console.log('data is,' , data);
		if(validateSignInQR(data)){
			const identityHash = (data as string).split(':')[1];
			setIdentity(identityHash);
			setCurrentIdentity(identityHash);
			navigate('main');
			setAlert('Success', `Signed in as ${identityHash}`);
		}
	};

	return <Container>
		<Container className={classes.pageTitle}>
			<Text text="Sign In" variant="h3"/>
			<Text wrap text="Following this guide on the left if this is your first time playing." variant="subtitle1"/>
		</Container>

		{scannerOpen ?
			!currentIdentity || currentIdentity === '' ?
					<QrReader
						delay={300}
						onError={handleError}
						onScan={handleScan}
						style={{maxWidth: 500, margin: 'auto'}}
					/>:
				<PlaceHolder text={"You have already Signed in, Please Sign out first"} variant="h4"/>
			:
			<Button variant="contained" onClick={()=>setScannerOpen(true)}>
				Scan Login Token Again
			</Button>
		}
		<Alert open={alertOpen} setOpen={setAlertOpen} title="Success" text="Login Success! That's how it works!"/>
	</Container>
}

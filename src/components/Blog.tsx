import {Button, Container, FormControl, Paper, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {useContext, useState} from 'react';
import {logError} from '../alertUtils';
import {PropsWithCurrentIdentity, withCurrentIdentity} from '../HOC';
import {issueTokenHelper, useExtrinsics} from '../hooks';
import {constructDataInsertion, useGetIpfsData} from '../ipfsUtils';
import {AlertStateContext} from '../stores/alertContext';
import colors from '../styles/colors';
import {commonStyles} from '../styles/common';
import Text from './Text';

export function Blog({currentIdentity}: PropsWithCurrentIdentity): React.ReactElement{
	const {issueToken} = useExtrinsics();
	const [updateIndex, setUpdateIndex] = useState(0);
	const ipfsData = useGetIpfsData(currentIdentity, 'write', updateIndex);
	const classes = useStyles();
	const [currentBlogText, setCurrentBlogText] = useState<string>('');
	const refreshTimeout = 2000;
	const {setAlert} = useContext(AlertStateContext);

	function onTextInputChange(event: React.ChangeEvent<HTMLInputElement>){
		setCurrentBlogText(event.target.value);
	}

	async function publishBlog(){
		try {
			await issueTokenHelper(currentIdentity, currentBlogText, issueToken);
			await fetch(constructDataInsertion(currentIdentity, `write:${currentBlogText}`));
			setCurrentBlogText('');
			setTimeout(() => {
				setUpdateIndex(updateIndex + 1);
			}, refreshTimeout);
		} catch (e){
			logError(e, setAlert);
		}
	}

	const renderRecord = ( record: string, index: number): React.ReactElement => (
		<Paper elevation={3} className={classes.record} key={`record${index.toString()}`}>
			<Text text={record} variant="subtitle1"/>
		</Paper>
	)

	return <Container>
		<Container className={classes.pageTitle}>
			<Text text="dTwitter" variant="h3"/>
		</Container>
		{ipfsData.map(renderRecord)}

		<Container  className={classes.padding}>
			<FormControl fullWidth>
			<TextField
				id="outlined-multiline-flexible"
				label="Write something down!"
				InputLabelProps={{color: 'secondary'}}
				multiline
				rowsMax={20}
				value={currentBlogText}
				onChange={onTextInputChange}
				variant="outlined"
			/>
			</FormControl>
		</Container>
		<Container className={classes.padding}>
			<Button variant="contained" onClick={publishBlog}>
				Publish this!
			</Button>
		</Container>
	</Container>
}

export default withCurrentIdentity(Blog);

const useStyles = makeStyles({
	padding:{
		margin: 15,
		padding: 0,
	},
	record: {
		// justifyContent: 'center',
		padding: 30,
		margin: 15,
		backgroundColor: colors.background.alert
	},
	...commonStyles
})

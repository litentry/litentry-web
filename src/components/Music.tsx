import {
	Container,
	Grid, IconButton, List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Star, StarBorder} from '@material-ui/icons';
import React, {MouseEvent, useContext} from 'react';
import {useExtrinsics} from '../hooks';
import {musicAccountIdentity, musicAccountSeedPhrase} from '../mockData/accounts';
import {Song, songs} from '../mockData/songs';
import {AlertStateContext} from '../stores/alertContext';
import {AppStateContext} from '../stores/appStateContext';
import colors from '../styles/colors';
import Text from './Text';
import { Keyring } from '@polkadot/api';
const encoder = new TextEncoder();

export default function Music (){
	const {state} = useContext(AppStateContext);
	const classes = useStyles();
	const {issueToken} = useExtrinsics();
	const {setAlert} = useContext(AlertStateContext);


	function renderListItem (item: Song, index: number): React.ReactElement {
		const onStarItem = async (event: MouseEvent<HTMLDivElement>): Promise<void> => {
			const keyring = new Keyring({ type: 'sr25519' });
			const newPair = keyring.addFromUri(musicAccountSeedPhrase);
			console.log('paris is', keyring.pairs);
			console.log('current keyring is', keyring);
			try {
				const unsub = await issueToken(
					'0xde9f58e218c4ee859d0aa4ee92bd8d1724ac2ce599aef3c9540b00418f41daec', //TODO change with parsed currentIdentity
					musicAccountIdentity,
					1,
					encoder.encode(item.name),
					encoder.encode('name'),
					0
				).signAndSend(newPair, result => {
					console.log('Current result is', result);
					console.log('Current result status is', result.status);
					if (result.status.isInBlock) {
						console.log(
							`Transaction included at blockHash ${result.status.asInBlock}`
						);
					} else if (result.status.isFinalized) {
						console.log(
							`Transaction finalized at blockHash ${result.status.asFinalized}`
						);
						unsub();
					}
				});
			} catch (e) {
				console.log('e is', e);
				setAlert(
					'Transaction Failed',
					'Please check if the account has enough token, or use Polkadot.js default account like Alice to send some tokens to this account'
				);
			}
		}

		return <ListItem key={index} role={undefined} dense button onClick={onStarItem}>
			<ListItemIcon>
				{ item.stared ? <Star/> : <StarBorder/>}
			</ListItemIcon>
			<ListItemText id={index.toString()} primary={item.name} className={classes.name}
										primaryTypographyProps={{variant: 'subtitle1'}}
										secondaryTypographyProps={{variant: 'subtitle2'}}
				secondary={item.singer}/>
			{/*<ListItemSecondaryAction>*/}
			{/*	<ListItemText primaryTypographyProps={{variant: 'body2'}} id={index.toString()} primary={item.singer} className={classes.singer} />*/}
				{/*<IconButton edge="end" aria-label="comments">*/}
				{/*	<CommentIcon />*/}
				{/*</IconButton>*/}
			{/*</ListItemSecondaryAction>*/}
		</ListItem>
	}

	function renderList ([key, value]:[string, Song[]]): React.ReactElement {
		return <Grid item xs={12} md={6}>
			<Typography variant="h6" className={classes.title}>
				{`${key} Music`}
			</Typography>
			<List className={classes.root}>
				{value.map(renderListItem)}
			</List>
		</Grid>
	}

	return <Container>
		<Text text="Litentry Music Player" variant="h3"/>
		<Grid container spacing={2}>
			{Object.entries(songs).map(renderList)}
		</Grid>
	</Container>
}

const useStyles = makeStyles({
	root:{

	},
	title: {
		color: colors.text.main
	},
	name: {
		color: colors.text.main
	},
	singer: {
		color: colors.text.faded,
	}
})

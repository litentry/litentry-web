import {
	Container,
	Grid, List,
	ListItem,
	ListItemIcon, ListItemSecondaryAction,
	ListItemText,
	Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {PlayArrow, Star, StarBorder} from '@material-ui/icons';
import React, {MouseEvent, useContext} from 'react';
import {PropsWithCurrentIdentity, withCurrentIdentity} from '../HOC';
import {useExtrinsics} from '../hooks';
import {constructDataInsertion} from '../ipfsUtils';
import {musicAccountIdentity, musicAccountSeedPhrase} from '../mockData/accounts';
import {Song, songs} from '../mockData/songs';
import {AlertStateContext} from '../stores/alertContext';
import colors from '../styles/colors';
import Text from './Text';
import { Keyring } from '@polkadot/api';
const encoder = new TextEncoder();

export function Music ({currentIdentity}: PropsWithCurrentIdentity){
	const classes = useStyles();
	const {issueToken} = useExtrinsics();
	const {setAlert} = useContext(AlertStateContext);

	function logError(e: any): void {
		console.log('e is', e.toString());
		setAlert(
			'Transaction Failed',
			'Please check if the account has enough token, or use Polkadot.js default account like Alice to send some tokens to this account'
		);
	}

	async function issueTokenAndPublishIpfs(item: Song, insertData: string){
		const keyring = new Keyring({ type: 'sr25519' });
		const newPair = keyring.addFromUri(musicAccountSeedPhrase);
		console.log('paris is', keyring.pairs);
		const unsub = await issueToken(
			currentIdentity,
			musicAccountIdentity,
			1,
			encoder.encode(insertData),
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
		fetch(constructDataInsertion(currentIdentity, insertData))
	}


	function renderListItem (item: Song, index: number): React.ReactElement {
		const onStarItem = async (event: MouseEvent<HTMLDivElement>): Promise<void> => {
			try {
				await issueTokenAndPublishIpfs(item, 'start song:' + item.name)
			} catch (e){
				logError(e);
			}
		}

		const onPlayItem = async (event: MouseEvent<HTMLDivElement>): Promise<void> => {
			try {
				await issueTokenAndPublishIpfs(item, 'play song:' + item.name)
			} catch (e){
				logError(e);
			}
		}

		return <ListItem key={index} role={undefined} dense>
			<ListItemIcon onClick={onPlayItem}>
				<PlayArrow/>
			</ListItemIcon>
			<ListItemText id={index.toString()} primary={item.name} className={classes.name}
										primaryTypographyProps={{variant: 'subtitle1'}}
										secondaryTypographyProps={{variant: 'subtitle2'}}
				secondary={item.singer}/>
			<ListItemSecondaryAction onClick={onStarItem}>
				<ListItemIcon>
					{ item.stared ? <Star/> : <StarBorder/>}
				</ListItemIcon>
			</ListItemSecondaryAction>
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
		<Text text="dSpotify Music Player" variant="h3"/>
		<Grid container spacing={2}>
			{Object.entries(songs).map(renderList)}
		</Grid>
	</Container>
}

export default withCurrentIdentity(Music);

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

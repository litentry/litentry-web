import {
	Container,
	Grid, IconButton, List,
	ListItem,
	ListItemIcon, ListItemSecondaryAction,
	ListItemText,
	Typography
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {PlayArrow, Star, StarBorder} from '@material-ui/icons';
import React, {MouseEvent, useContext} from 'react';
import {PropsWithCurrentIdentity, withCurrentIdentity} from '../HOC';
import {issueTokenHelper, useExtrinsics} from '../hooks';
import {constructDataInsertion} from '../ipfsUtils';
import {musicAccountIdentity, musicAccountSeedPhrase} from '../mockData/accounts';
import {Song, songs} from '../mockData/songs';
import {AlertStateContext} from '../stores/alertContext';
import colors from '../styles/colors';
import {commonStyles} from '../styles/common';
import Text from './Text';
import { Keyring } from '@polkadot/api';


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
		await issueTokenHelper(currentIdentity, insertData, issueToken);
		fetch(constructDataInsertion(currentIdentity, insertData))
	}


	function renderListItem (item: Song, index: number): React.ReactElement {
		const onStarItem = async (event: MouseEvent<HTMLDivElement>): Promise<void> => {
			try {
				await issueTokenAndPublishIpfs(item, 'star:' + item.name)
			} catch (e){
				logError(e);
			}
		}

		const onPlayItem = async (event: MouseEvent<HTMLDivElement>): Promise<void> => {
			try {
				await issueTokenAndPublishIpfs(item, 'play:' + item.name)
			} catch (e){
				logError(e);
			}
		}

		return <ListItem key={index} role={undefined} dense>
			<ListItemIcon onClick={onPlayItem}>
				<IconButton>
					<PlayArrow/>
				</IconButton>
			</ListItemIcon>
			<ListItemText id={index.toString()} primary={item.name} className={classes.name}
										primaryTypographyProps={{variant: 'subtitle1'}}
										secondaryTypographyProps={{variant: 'subtitle2'}}
				secondary={item.singer}/>
			<ListItemSecondaryAction onClick={onStarItem}>
				<ListItemIcon>
					<IconButton>
					{ item.stared ? <Star/> : <StarBorder/>}
					</IconButton>
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
		<Container className={classes.pageTitle}>
			<Text text="dSpotify Music Player" variant="h3"/>
		</Container>
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
	},
	...commonStyles
})

import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Create, ExitToApp, PlayArrow, VpnKey} from '@material-ui/icons';
import React, {useContext} from 'react';
import {drawerWidth} from '../constant';
import { AppStateContext} from '../stores/appStateContext';
import zIndexes from '../styles/zIndexes';
import Text from './Text';

type ListItem = {
	icon: React.ReactElement;
	text: string;
	route: (() => void)| string;
	isShow: boolean;
}

export default function SideBar() {
	const styles = useStyles();
	const theme = useTheme();
	const {navigate, state, setCurrentIdentity} = useContext(AppStateContext);
	const {currentIdentity} = state;
	const isLoggedIn = !!currentIdentity && currentIdentity !== '';

	const listItems: ListItem[] = [
		{
			icon: <VpnKey/>,
			text: 'Sign In',
			route: 'login',
			isShow: !isLoggedIn
		},
		{
			icon: <ExitToApp/>,
			text: 'Sign Out',
			isShow: isLoggedIn,
			route: (): void => {
				setCurrentIdentity('');
			}
		}
	];

	const appItems = [
		{
			icon: <PlayArrow/>,
			text: 'Music Player',
			route: 'music',
		},
		{
			icon: <Create/>,
			text: 'Twitting App',
			route: 'blog',
		}
	]

	const relatedLinks = [
		{
			text: 'Guide',
			link: 'https://www.litentry.com/post/play-litentry-dapps-with-ipfs-part-1'
		},
		{
			text: 'Litentry Data Center',
			link: 'https://data.litentry.com/'
		},
		{
			text: 'Litentry Authenticator',
			link: 'https://www.litentry.com/wallet'
		},
		{
			text: 'Litentry Graphql',
			link: 'https://graphql.litentry.com:4000/playground'
		}
	]

	function renderListItem (item: ListItem, index: number): null| React.ReactElement {
		if(!item.isShow)
			return null;
		return <ListItem button key={'SideBarList' + index} onClick={() => {
			if(typeof item.route === 'string') {
				navigate(item.route);
			} else {
				item.route();
			}
		}}>
			<ListItemIcon>{item.icon}</ListItemIcon>
			<ListItemText primary={item.text}/>
		</ListItem>
	};

	const drawer = (
		<div>
			<div className={styles.toolbar}/>
			<Divider/>
			<List>
				{listItems.map(renderListItem)}
			</List>
			<Divider/>
			<div className={styles.listTitle}>
				<Text text="Web Apps" variant="h6"/>
			</div>
			<List>
				{appItems.map((item, index) => (
					<ListItem button key={'SideBarAppList' + index} onClick={() => {
						navigate(item.route);
					}}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text}/>
					</ListItem>
				))}
			</List>
			<Divider/>
			<div className={styles.listTitle}>
				<Text text="Links" variant="h6"/>
			</div>
			<Divider/>
			<List>
				{relatedLinks.map((item, index) => (
					<ListItem button key={'SideBarLinkList' + index} onClick={() => {
						window.open(item.link)
					}}>
						<ListItemText primary={item.text}/>
					</ListItem>
				))}
			</List>
		</div>
	);

	return <nav className={styles.drawer} aria-label="mailbox folders">
		<Drawer
			// container={container}
			variant="permanent"
			anchor={theme.direction === 'rtl' ? 'right' : 'left'}
			classes={{
				paper: styles.drawerPaper,
			}}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
		>
			{drawer}
		</Drawer>
	</nav>
}

const useStyles = makeStyles((theme) => ({
	container: {
		position: 'fixed',
		flexDirection: 'column',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		drawerWidth: 200,
		height: '100%',
		marginLeft: 16,
		zIndex: zIndexes.sideBar,
		backgroundColor: '#f00'
	},
	// necessary for content to be below app bar
	listTitle: {
		paddingLeft: 16,
		paddingTop: 10
	},
	toolbar: theme.mixins.toolbar,
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
		backgroundColor: '#424242'
	},
	drawerPaper: {
		width: drawerWidth,
	},
}));

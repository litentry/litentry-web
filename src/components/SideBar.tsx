import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {ExitToApp, PlayArrow} from '@material-ui/icons';
import React, {useContext} from 'react';
import {drawerWidth} from '../constant';
import { AppStateContext} from '../stores/appStateContext';
import zIndexes from '../styles/zIndexes';
import Text from './Text';

export default function SideBar() {
	const styles = useStyles();
	const theme = useTheme();
	const {navigate} = useContext(AppStateContext);

	const listItems = [
		{
			icon: <ExitToApp/>,
			text: 'Sign In',
			route: 'login',
		}
	];

	const appItems = [
		{
			icon: <PlayArrow/>,
			text: 'Music Player',
			route: 'music',
		}
	]

	const drawer = (
		<div>
			<div className={styles.toolbar}/>
			<Divider/>
			<Text text="IoT Scenario" variant="h6"/>
			<List>
				{listItems.map((item, index) => (
					<ListItem button key={'SideBarList' + index} onClick={() => {
						navigate(item.route);
					}}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text}/>
					</ListItem>
				))}
			</List>
			<Divider/>
			<Text text="Web Scenario" variant="h6"/>
			<List>
				{appItems.map((item, index) => (
					<ListItem button key={'SideBarList' + index} onClick={() => {
						navigate(item.route);
					}}>
						<ListItemIcon>{item.icon}</ListItemIcon>
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

import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, useTheme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {ExitToApp, Storage, VpnKey} from '@material-ui/icons';
import React, {useContext} from 'react';
import {drawerWidth} from '../constant';
import {actions, AppContext} from '../store';

export default function SideBar() {
	const styles = useStyles();
	const theme = useTheme();
	const {state, dispatch} = useContext(AppContext);

	const listItems = [
		{
			icon: <ExitToApp/>,
			text: 'Login',
			route: 'login',
		},
		{
			icon: <VpnKey/>,
			text: 'Sign Up',
			route: 'signUp',
		},
		{
			icon: <Storage/>,
			text: 'Check Database',
			route: 'database',
		},
	];

	const drawer = (
		<div>
			<div className={styles.toolbar}/>
			<Divider/>
			<List>
				{listItems.map((item, index) => (
					<ListItem button key={'SideBarList' + index} onClick={() => {
						dispatch({type: actions.NAVIGATE, data: item.route})
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
		zIndex: 200,
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

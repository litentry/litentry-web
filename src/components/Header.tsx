import {AppBar, Button, IconButton, Typography, Toolbar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';
import React, {Dispatch, Reducer, useContext} from 'react';
import {actions, AppContext, AppState} from '../store';

export default function() {
	const styles = useStyles();
	const {state, dispatch} = useContext(AppContext);
	return<AppBar position="static" className={styles.container}>
			<Toolbar>
				<IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu" onClick={()=>{}}>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={styles.expand}>

				</Typography>
				<Typography variant="h6" className={styles.title}>
					Litentry Demo App
				</Typography>
			</Toolbar>
		</AppBar>
}

const useStyles = makeStyles((theme) => ({
	container: {
		backgroundColor: '#08b59c'
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {},
	expand: {
		flexGrow: 1,
	},
}));

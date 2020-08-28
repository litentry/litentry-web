import {AppBar, IconButton, Typography, Toolbar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';

export default function() {
	const styles = useStyles();
	return<AppBar position="static" className={styles.container}>
			<Toolbar>
				<IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu" onClick={()=>{}}>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" className={styles.expand}>

				</Typography>
				<Typography variant="h6" className={styles.title}>
					Litentry Playground App
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

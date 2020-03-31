import {Container, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography} from '@material-ui/core';
import React from 'react';
import {useApi} from '../hooks';
import Text from './Text';

export default function Login() {
	const api = useApi();
	return <Container>
		<Text text="Log in" variant="h3"/>
	</Container>
}

import {Container} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Variant} from '@material-ui/core/styles/createTypography';
import React from 'react';
import colors from '../styles/colors';
import Text from './Text';

export function PlaceHolder({text, variant}: {text:string, variant?: Variant}): React.ReactElement {
	const styles = useStyles();
	return <Container className={styles.root}>
		<Text text={text} variant={variant}/>
	</Container>
}

const useStyles = makeStyles({
	root: {
		display: "flex",
		height: 200,
		backgroundColor: colors.background.app,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

import {Typography, TypographyClassKey} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Variant} from '@material-ui/core/styles/createTypography';
import React from 'react';

export default function({variant, text}: {
	variant?: Variant | 'inherit';
	text: string;
}) {
	const styles= useStyles();
	return <Typography variant={variant || 'inherit'} className={styles.font}>
		{text}
	</Typography>
}

const useStyles = makeStyles({
	font: {
		color: '#DDDDDD'
	}
});

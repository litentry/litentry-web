import {Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Variant} from '@material-ui/core/styles/createTypography';
import React from 'react';

export default function Text({variant, text, wrap}: {
	variant?: Variant | 'inherit';
	text: string;
	wrap?: boolean;
}) {
	const styles= useStyles();
	const noWrap = wrap !== undefined ? !wrap : true
	return <Typography variant={variant || 'inherit'} className={styles.font} noWrap={noWrap}>
		{text}
	</Typography>
}

const useStyles = makeStyles({
	font: {
		color: '#DDDDDD'
	}
});

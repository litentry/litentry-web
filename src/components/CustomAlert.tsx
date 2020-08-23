import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useContext, useEffect, useMemo, useState} from 'react';
import colors from '../styles/colors';
import {Action, AlertStateContext} from '../stores/alertContext';
import {
	Button,
	Container,
} from '@material-ui/core';
import zIndexes from '../styles/zIndexes';
import Text from './Text';

export default function CustomAlert(): React.ReactElement {
	const { title, alertIndex, message, actions } = useContext(AlertStateContext);
	const styles = useStyles();
	/* eslint-disable-next-line react-hooks/exhaustive-deps */
	const [alertDisplay, setAlertDisplay] = useState<boolean>(false);

	useEffect(() => {
		if (alertIndex === 0) return;
		setAlertDisplay(true);
		setTimeout(()=> {
			setAlertDisplay(false)
		}, 2000);
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [alertIndex]);

	const renderActions = (action: Action, index: number): React.ReactElement => (
		<Button
			key={'alert' + index}
			onClick={(): any => {
				if (action.onPress) {
					action.onPress();
				}
				setAlertDisplay(false);
			}}
			className={styles.button}
			variant={
				action.onPress ? "contained" : "text"
			}
		>{action.text}</Button>
	);

	if (alertDisplay) {
		return (
			<Container className={styles.background}>
				<div className={styles.body}>
					{title !== '' && <Text variant="h4" text={title}/>}
					<Text text={message} variant="body1"/>
					{actions !== [] && (
						<div className={styles.actionsContainer}>
							{actions.map(renderActions)}
						</div>
					)}
				</div>
			</Container>
		);
	} else {
		return <div />;
	}
}

const useStyles = makeStyles({
	actionsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20
	},
	background: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 180,
		width: '100%',
		margin: 'auto',
		zIndex: zIndexes.alert,
		maxWidth: '100%',
	},
	body: {
		alignItems: 'center',
		justifyContent: 'center',
		boxShadow: '5px 10px 18px #444',
		backgroundColor: colors.background.app,
		padding: 30,
		margin: 'auto',
		width: '60%'
	},
	button: {
		alignItems: 'center',
		borderRadius: 0,
		flex: 1,
		flexGrow: 1,
		justifyContent: 'center',
		marginHorizontal: 2,
		paddingHorizontal: 0
	}
});

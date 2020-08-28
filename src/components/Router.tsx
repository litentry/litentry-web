import {Container} from '@material-ui/core';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import React, {useContext} from 'react';
import {drawerWidth} from '../constant';
import {AppStateContext, AppStoreState} from '../stores/appStateContext';
import theme from '../themes';
import Header from './Header';
import {PlaceHolder} from './PlaceHolder';
import SignIn from './SignIn';
import Music from './Music';
import SideBar from './SideBar';
import SignUp from './SignUp';
import Text from './Text';

const renderMain = (state: AppStoreState): React.ReactElement => {
	const { route, currentIdentity } = state;
	switch (route) {
		case 'signUp':
			return <SignUp/>;
		case 'login':
			return <SignIn/>;
		case 'music':
			return <Music/>;
		default:
			return <Container>
				<PlaceHolder text="Welcome to the Litentry Playground!" variant="h3"/>
				{currentIdentity ? <PlaceHolder text={`Signed Identity: ${currentIdentity}`} variant="h5"/>
				: 		<PlaceHolder text="Please sign in first" variant="h3"/>}
			</Container>
	}
};

export default function Router() {
	const {state} = useContext(AppStateContext);
	const styles = useStyles();

	return <ThemeProvider theme={theme}>
		<Header/>
		<div className={styles.container}>
			{renderMain(state)}
		</div>
		<SideBar/>
	</ThemeProvider>
};

const useStyles = makeStyles({
	container: {
		flexGrow: 1,
		marginLeft: drawerWidth,
	}
});

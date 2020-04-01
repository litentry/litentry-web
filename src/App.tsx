import {Container} from '@material-ui/core';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import React, {useReducer} from 'react';
import 'typeface-roboto';
import Header from './components/Header';
import Login from './components/Login';
import SideBar from './components/SideBar';
import './App.css';
import SignUp from './components/SignUp';
import {drawerWidth} from './constant';
import {initState, reducer as storeReducer, StateProvider} from './store';
import theme from './themes';
import Text from './components/Text';

const renderMain = (route:string): React.ReactElement => {
  switch (route) {
    case 'signUp':
      return <SignUp/>;
    case 'login':
      return <Login/>;
    default:
      return <Container>
        <Text text="Welcome to the Litentry Playground!" variant="h3"/>
      </Container>
  }
}

function App() {
  const styles = useStyles();
  const reducer = useReducer(storeReducer, initState);
  const [state, dispatch] = reducer;
  return (
    <div className={styles.root}>
      <StateProvider value={{ state, dispatch }}>
        <ThemeProvider theme={theme}>
          <Header/>
          <div className={styles.container}>
            {renderMain(state.route)}
          </div>
          <SideBar/>
        </ThemeProvider>
      </StateProvider>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: '#424242'
  },
  container: {
    flexGrow: 1,
    marginLeft: drawerWidth,
  }
});

export default App;

import {AppBar, Container, Grid, Paper} from '@material-ui/core';
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

const renderMain = (route:string): React.ReactElement => {
  switch (route) {
    case 'signUp':
      return <SignUp/>;
    case 'login':
      return <Login/>;
    default:
      return <div>Test your identity module</div>
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
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
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

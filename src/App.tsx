import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import 'typeface-roboto';
import Router from './components/Router';
import './App.css';
import {useApi} from './hooks';
import {AppStateContext, useAppContext} from './stores/appStateContext';
import {AlertStateContext, useAlertContext} from './stores/alertContext';

function App() {
  const appContext = useAppContext();
  const isApiReady = useApi();
  const styles = useStyles();
 const alertContext = useAlertContext();

  return (
    <div className={styles.root}>
      {isApiReady && <AppStateContext.Provider value={appContext}>
        <AlertStateContext.Provider value={alertContext}>
        <Router/>
        </AlertStateContext.Provider>
      </AppStateContext.Provider>}
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '100%',
    backgroundColor: '#424242'
  }
});

export default App;

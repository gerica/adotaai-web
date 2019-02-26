import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import MiniDrawer from './Components/Drawer/MiniDrawer';
import PerfilPage from './Containers/Perfil';
import HomePage from './Containers/Home';
import configureStore from './Stores';
import MyTheme from './muiTheme';
import LoginPage from './Containers/Login';

const { store, persistor } = configureStore();
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider theme={MyTheme}>
          <Router>
            <MiniDrawer>
              {/* <Header /> */}
              <Switch>
                <Route path="/perfil" component={PerfilPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/home" component={HomePage} />
                <Route path="/" component={HomePage} />
                {/* <Route path="/ccc" component={PerfilPage} /> */}
              </Switch>
            </MiniDrawer>
          </Router>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

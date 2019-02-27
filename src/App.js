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
import {
  ROUTER_PERFIL,
  ROUTER_LOGIN,
  ROUTER_HOME,
  ROUTER_DEFAULT
} from './Utils/constants';

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
                <Route path={ROUTER_PERFIL} component={PerfilPage} />
                <Route path={ROUTER_LOGIN} component={LoginPage} />
                <Route path={ROUTER_HOME} component={HomePage} />
                <Route path={ROUTER_DEFAULT} component={HomePage} />
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

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import HomePage from './Containers/Home';
import configureStore from './Stores';

const { store, persistor } = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HomePage />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

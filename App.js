import React from 'react';

import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import Routes from './src/navigation/Routes';


const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;

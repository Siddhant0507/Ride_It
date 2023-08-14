import React from 'react';

import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import LoginStack from './src/navigation/LoginStack';

const App = () => {
  return (
    <Provider store={store}>
      <LoginStack />
    </Provider>
  );
};

export default App;

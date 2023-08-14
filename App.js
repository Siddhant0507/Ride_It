import React from 'react';

import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import LoginStack from './src/navigation/LoginStack';

import HomeStack from './src/navigation/HomeStack';

const App = () => {
  return (
    <Provider store={store}>
    {/* <LoginStack /> */}
      <HomeStack/>

    </Provider>
  );
};

export default App;

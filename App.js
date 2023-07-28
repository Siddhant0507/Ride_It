
import React from 'react';

import {Provider} from 'react-redux';
import {store} from './Redux/Store';

import LoginStack from './Navigation/LoginStack';
import HomeScreen from './Screens/HomeScreen';
import HomeStack from './Navigation/HomeStack';

const App = () => {
  return <LoginStack/>;
};

export default App;


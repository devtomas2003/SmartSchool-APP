import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Transition } from 'react-native-reanimated';
import React from 'react';
import Login from './pages/Login';
import read from './pages/read';
import Menu from './pages/Menu';
import Register from './pages/Register';
import Resultado from './pages/Resultado';
import NoConnection from './pages/NoConnection';
import Update from './pages/Update';
const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Register,
        Menu,
        read,
        Resultado,
        NoConnection,
        Update
    },
    {
      transition: (
        <Transition.Together>
          <Transition.Out
            type="slide-bottom"
            durationMs={400}
            interpolation="easeIn"
          />
          <Transition.In type="fade" durationMs={500} />
        </Transition.Together>
      )
    })
);

export default Routes;
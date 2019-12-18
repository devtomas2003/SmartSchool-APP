import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/Login';
import read from './pages/read';
import Menu from './pages/Menu';
import Resultado from './pages/Resultado';
import NoConnection from './pages/NoConnection';
const Routes = createAppContainer(
    createSwitchNavigator({
        NoConnection,
        Login,
        Menu,
        read,
        Resultado
    })
);

export default Routes;
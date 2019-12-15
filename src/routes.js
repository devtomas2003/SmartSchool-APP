import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/Login';
import read from './pages/read';
import Menu from './pages/Menu';
import Resultado from './pages/Resultado';
const Routes = createAppContainer(
    createSwitchNavigator({
        read,
        Menu,
        Login,
        Resultado
    })
);

export default Routes;
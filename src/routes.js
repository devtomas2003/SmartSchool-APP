import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Resultado from './pages/Resultado';
const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        Menu,
        Resultado
    })
);

export default Routes;
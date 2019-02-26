import { Home, AccountCircle } from '@material-ui/icons';
import HomePage from '../Containers/Home';
import ProfilPage from '../Containers/Perfil';
import LoginPage from '../Containers/Login';

const Routes = [
  {
    order: 1,
    path: '/home',
    sidebarName: 'Home',
    navbarName: 'Home',
    icon: Home,
    component: HomePage,
    selected: false
  },
  {
    order: 2,
    path: '/perfil',
    sidebarName: 'Profile',
    navbarName: 'Profile',
    icon: AccountCircle,
    component: ProfilPage,
    selected: false
  },
  {
    order: 3,
    path: '/login',
    sidebarName: 'Login',
    navbarName: 'Login',
    icon: AccountCircle,
    component: LoginPage,
    selected: false
  }
];

export default Routes;

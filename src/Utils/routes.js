import { Home, AccountCircle } from '@material-ui/icons';
import HomePage from '../Containers/Home';
import ProfilPage from '../Containers/Perfil';

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
  }
];

export default Routes;

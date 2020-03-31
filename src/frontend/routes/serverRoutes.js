import Home from '../containers/Home';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Player from '../containers/Player';
import NotFound from '../containers/NotFound';

const routes = [
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/login',
    component: Login,
  },
  {
    exact: true,
    path: '/signup',
    component: Signup,
  },
  {
    exact: true,
    path: '/player/:id',
    component: Player,
  },
  {
    exact: false,
    name: 'NotFound',
    component: NotFound,
  },
];

export default routes;

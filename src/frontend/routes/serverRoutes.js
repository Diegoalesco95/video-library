import Home from '../containers/Home';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Player from '../containers/Player';
import NotFound from '../containers/NotFound';

const routes = [
  {
    exact: true,
    path: '/Platzi-video/',
    component: Home,
  },
  {
    exact: true,
    path: '/Platzi-video/login',
    component: Login,
  },
  {
    exact: true,
    path: '/Platzi-video/signup',
    component: Signup,
  },
  {
    exact: true,
    path: '/Platzi-video/player/:id',
    component: Player,
  },
  {
    exact: false,
    name: 'NotFound',
    component: NotFound,
  },
];

export default routes;

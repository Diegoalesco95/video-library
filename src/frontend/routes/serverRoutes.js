import Home from '../containers/Home';
import Login from '../containers/Login';
import Signup from '../containers/Signup';
import Player from '../containers/Player';
import NotFound from '../containers/NotFound';

const serverRoutes = (isLogged) => {
  return [
    {
      path: '/',
      component: isLogged ? Home : Login,
      exact: true,
    },
    {
      path: '/login',
      component: isLogged ? Home : Login,
      exact: true,
    },
    {
      path: '/signup',
      component: Signup,
      exact: true,
    },
    {
      path: '/player/:id',
      component: isLogged ? Player : Login,
      exact: true,
    },
    {
      name: 'NotFound',
      component: NotFound,
    },
  ];
};

export default serverRoutes;

import Home from '../../../app/containers/Home';
import Login from '../../../app/containers/Login';
import Signup from '../../../app/containers/Signup';
import Player from '../../../app/containers/Player';
import NotFound from '../../../app/containers/NotFound';

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

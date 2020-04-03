import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

// import axios from 'axios';

import initialState from '../../frontend/initialState';
import Layout from '../../frontend/components/Layout';
import reducer from '../../frontend/reducers';
import serverRoutes from '../../frontend/routes/serverRoutes';
import setResponse from '../render/index';

const renderApp = (req, res, next) => {
  try {
    const isLogged = initialState.user.id;
    const store = createStore(reducer, initialState);
    const html = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          <Layout>{renderRoutes(serverRoutes(isLogged))}</Layout>
        </StaticRouter>
      </Provider>,
    );
    const preloadedState = store.getState();
    res.send(setResponse(html, preloadedState));
  } catch (error) {
    next(error);
  }
};

export default renderApp;

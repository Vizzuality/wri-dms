import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import Routes from './routes';
import { reducer as reduxFormReducer } from 'redux-form';
import { GrowlerReducer } from 'flash-notification-react-redux';
import * as reducers from './reducers';

import 'react-widgets/lib/less/react-widgets.less';
import '../styles/index.scss';

const reducer = combineReducers({
  ...reducers,
  form: reduxFormReducer,
  routing: routerReducer,
  growler: GrowlerReducer,
});


const middlewareRouter = routerMiddleware(browserHistory);

const store = createStore(
  reducer,
  applyMiddleware(middlewareRouter),
  applyMiddleware(thunk)
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('app')
);

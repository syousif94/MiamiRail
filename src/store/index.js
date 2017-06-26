import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
// import reducers
import reducers from '~/reducers';
import { watchAppState } from '~/lib/appState';

const middleware = process.env.NODE_ENV === 'development'
  ? [thunk, createLogger()]
  : [thunk];

const configureStore = compose(applyMiddleware(...middleware))(createStore);

const store = configureStore(reducers, {});

watchAppState();

export default store;

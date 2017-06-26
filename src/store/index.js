import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
// import reducers
import reducers from '~/reducers';

const middleware = process.env.NODE_ENV !== 'production'
  ? [thunk, createLogger()]
  : [thunk];

const configureStore = compose(applyMiddleware(...middleware))(createStore);

const store = configureStore(reducers, {});

export default store;

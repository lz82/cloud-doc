import { combineReducers } from 'redux-immutable';
import { createStore, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import moduleReducer from './modules';

// import queryApiMiddleWare from './middlewares/query-api';

const rootReducer = combineReducers({
  ...moduleReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store: Store;
if (process.env.NODE_ENV !== 'production') {
  store = createStore(
    rootReducer,
    // composeEnhancers(applyMiddleware(logger, thunk, queryApiMiddleWare))
    composeEnhancers(applyMiddleware(thunk))
  );
} else {
  // store = createStore(rootReducer, applyMiddleware(thunk, queryApiMiddleWare));
  store = createStore(rootReducer, applyMiddleware(thunk));
}

export default store;

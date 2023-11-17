import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from './rootReducer';

export const makeStore = () => {
  const middlewares = [];
  return createStore(rootReducer, applyMiddleware(...middlewares));
};

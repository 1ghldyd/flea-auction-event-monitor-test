import {combineReducers} from 'redux';
import {reducer as configReducer} from './config';
import {reducer as auctionViewedReducer} from './auctionViewed';

export const rootReducer = combineReducers({
  auctionViewed: auctionViewedReducer,
  config: configReducer,
});

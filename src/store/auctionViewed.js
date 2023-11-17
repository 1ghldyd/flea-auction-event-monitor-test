import {createAction, handleActions} from 'redux-actions';

const ITEMS = 'auctionViewed/ITEMS';

export const setItems = createAction(ITEMS);

const initialState = {
  items: [],
};

export const reducer = handleActions(
  {
    [ITEMS]: (state, {payload}) => ({
      ...state,
      items: payload,
    }),
  },
  initialState,
);

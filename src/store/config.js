import {createAction, handleActions} from 'redux-actions';

const LAYOUT = 'config/LAYOUT';

export const setLayout = createAction(LAYOUT);

const initialState = {
  layout: {
    headerHeight: 40,
    tabBarHeight: 50,
  },
};

export const reducer = handleActions(
  {
    [LAYOUT]: (state, {payload}) => ({
      ...state,
      layout: {...state.layout, ...payload},
    }),
  },
  initialState,
);

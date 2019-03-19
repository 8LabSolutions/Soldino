import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { LOGIN, LOGOUT, RESET, BUSINESS, CITIZEN, GOVERN } from "../constants/actionTypes";

const initialState = {
  logged: false,
  userType: null,
};
export function rootReducer(state = initialState, action) {
  if (action.type === LOGIN) {
    return Object.assign({}, state, {
      logged: action.par
    });
  }
  if (action.type === LOGOUT || action.type === RESET) {
    return Object.assign({}, state, {
      logged: action.par,
      userType: action.user
    });
  }
  if (action.type === CITIZEN || action.type === GOVERN || action.type === BUSINESS) {
    return Object.assign({}, state, {
      userType: action.user
    });
  }
  return state;
}
export const persistConfig = {
  key: 'root',
  storage: storage
};

export default persistReducer(persistConfig, rootReducer);
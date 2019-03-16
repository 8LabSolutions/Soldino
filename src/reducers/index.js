import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { LOGIN, LOGOUT, RESET } from "../constants/actionTypes";

const initialState = {
  logged: false
};
export function rootReducer(state = initialState, action) {
  if (action.type === LOGIN || action.type === LOGOUT || action.type === RESET) {
    return Object.assign({}, state, {
      logged: action.par
    });
  }
  return state;
}
export const persistConfig = {
  key: 'root',
  storage: storage
  //blacklist: ['logged']
};

export default persistReducer(persistConfig, rootReducer);
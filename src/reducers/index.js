import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { LOGIN, LOGOUT } from "../constants/actionTypes";

const initialState = {
  logged: false
};
export function rootReducer(state = initialState, action) {
  if (action.type === LOGIN || action.type === LOGOUT) {
    return Object.assign({}, state, {
      logged: action.par
    });
  }
  return state;
}
export const persistConfig = {
  key: 'root',
  storage: storage
};

export default persistReducer(persistConfig, rootReducer);
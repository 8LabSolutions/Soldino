import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { LOGIN, LOGOUT, RESET, BUSINESS, CITIZEN, GOVERN, SEARCH, ADDTOCART, REMOVEFROMCART, INCREASEQUANTITY, DECREASEQUANTITY } from "../constants/actionTypes";
import { store } from '../store';

const initialState = {
  logged: false,
  userType: null,
  searchProduct: "",
  cart: []
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
  if (action.type === SEARCH) {
    return Object.assign({}, state, {
      searchProduct: action.str
    });
  }
  if (action.type === ADDTOCART) {
    return Object.assign({}, state, {
      cart: [...state.cart, action.product]
    });
  }
  if (action.type === REMOVEFROMCART) {
    return Object.assign({}, state, {
      cart: state.cart.splice(state.cart.indexOf(action.product), 1)
    });
  }
  return state;
}
export const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['searchProduct', 'cart']
};

export default persistReducer(persistConfig, rootReducer);

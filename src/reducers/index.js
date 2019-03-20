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
    var newCart1 = []
    if(state.cart.length===0){
      newCart1 = [action.product]
    }else{
      for(var z=0; z<state.cart.length; z++){
        if(state.cart[z].title===action.product.title){
          action.product.quantity = +state.cart[z].quantity + +action.product.quantity
        }else{
          newCart1 = [...newCart1, state.cart[z]]
        }
      }
      newCart1 = [...newCart1, action.product]
    }
    return Object.assign({}, state, {
      cart: newCart1
    });
    /*
    return Object.assign({}, state, {
      cart: [...state.cart, action.product]
    });*/
  }
  if (action.type === REMOVEFROMCART) {
    var newCart = []
    for(var i=0; i<state.cart.length; i++){
      if(state.cart[i].title!==action.product.title){
        newCart = [...newCart, state.cart[i]]
      }
    }
    return Object.assign({}, state, {
      cart: newCart
    });
  }
  if (action.type === INCREASEQUANTITY) {
    var newCartAdd = []
    for(var j=0; j<state.cart.length; j++){
      if(state.cart[j].title===action.product.title){
        newCartAdd = [...newCartAdd, action.product]
      }else{
        newCartAdd = [...newCartAdd, state.cart[j]]
      }
    }
    return Object.assign({}, state, {
      cart: newCartAdd
    });
  }
  if (action.type === DECREASEQUANTITY) {
    var newCartRm = []
    for(var k=0; k<state.cart.length; k++){
      if(state.cart[k].title===action.product.title){
        newCartRm = [...newCartRm, action.product]
      }else{
        newCartRm = [...newCartRm, state.cart[k]]
      }
    }
    return Object.assign({}, state, {
      cart: newCartRm
    });
  }
  return state;
}
export const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['searchProduct']
};

export default persistReducer(persistConfig, rootReducer);

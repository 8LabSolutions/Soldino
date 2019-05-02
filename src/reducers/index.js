import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { LOGIN, LOGOUT, RESET, BUSINESS, CITIZEN, GOVERN, SEARCH, ADDTOCART, REMOVEFROMCART, INCREASEQUANTITY, DECREASEQUANTITY, CARTTOPENDING, CARTTOORDERS, BEGINLOADING, ENDLOADING, GETBUSINESSLIST, GETCITIZENLIST, MINTANDDISTRIBUTE, GETMYPRODUCTS, GETSTOREPRODUCTS, INCREASEINDEX, DECREASEINDEX, RESETINDEX, SETTOTALNUMBEROFPRODUCTS, SETTOTALNUMBEROFMYPRODUCTS, PASSKEYPROD, GETMYORDERS, RESETCART, SETINVOICES, SETPERIODS, SELECTEDPERIOD, RESETINVOICES} from "../constants/actionTypes";
import { defaultIndex } from '../constants/fixedValues';

const initialState = {
  logged: false,
  user: null,
  searchProduct: "",
  cart: [],
  pending: [],
  ordersList: [],
  loading: false,
  userList: [],
  myProductsArray: [],
  index: defaultIndex,
  totalStoreProduct: 0,
  totalMyProduct: 0,
  editProd: null,
  periods: [],
  invoices: [],
  selectedPeriod: {id: "Select a quarter", amount: null, payable: false}
};
export function rootReducer(state = initialState, action) {
  if (action.type === BEGINLOADING || action.type === ENDLOADING) {
    return Object.assign({}, state, {
      loading: action.loading
    });
  }
  if (action.type === LOGIN) {
    return Object.assign({}, state, {
      logged: action.par,
      user: action.user
    });
  }
  if (action.type === LOGOUT || action.type === RESET) {
    return Object.assign({}, state, {
      logged: action.par,
      user: action.user
    });
  }
  if (action.type === CITIZEN || action.type === GOVERN || action.type === BUSINESS) {
    return Object.assign({}, state, {
      user: action.user
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
        if(state.cart[z].keyProd===action.product.keyProd){
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
      if(state.cart[i].keyProd!==action.product.keyProd){
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
      if(state.cart[j].keyProd===action.product.keyProd){
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
      if(state.cart[k].keyProd===action.product.keyProd){
        newCartRm = [...newCartRm, action.product]
      }else{
        newCartRm = [...newCartRm, state.cart[k]]
      }
    }
    return Object.assign({}, state, {
      cart: newCartRm
    });
  }
  if (action.type === CARTTOPENDING) {
    return Object.assign({}, state, {
      pending: [...state.pending, action.cart],
      cart: []
    });
  }
  if (action.type === CARTTOORDERS) {
    return Object.assign({}, state, {
      ordersList:
        [...state.ordersList,
        {
          products: action.cart,
          date: action.date,
          number: action.number,
          VAT: action.VAT,
          net: action.net,
          address: action.address,
          buyerName: action.buyerName,
          buyerDetails: action.buyerDetails,
        }]
      ,
      cart: []
    });
  }

  //set the list of the users
  if(action.type === GETCITIZENLIST) {
    return Object.assign({}, state, {
      citizenList: action.citizenList
    })
  }

  if(action.type === GETBUSINESSLIST) {
    return Object.assign({}, state, {
      businessList: action.businessList
    })
  }

  if(action.type === MINTANDDISTRIBUTE) {
    return Object.assign({}, state, {
      totalSupply: action.total,
      governmentSupply: action.amount
    })
  }

  if(action.type === GETMYPRODUCTS) {
    return Object.assign({}, state, {
      myProductsArray: action.myProductsArray
    })
  }

  if(action.type === GETSTOREPRODUCTS) {
    return Object.assign({}, state, {
      storeProducts: action.storeProducts
    })
  }

  if(action.type === INCREASEINDEX) {
    return Object.assign({}, state, {
      index: state.index+1
    })
  }

  if(action.type === DECREASEINDEX) {
    return Object.assign({}, state, {
      index: state.index-1
    })
  }

  if(action.type === RESETINDEX) {
    return Object.assign({}, state, {
      index: 0
    })
  }

  if(action.type === SETTOTALNUMBEROFPRODUCTS) {
    return Object.assign({}, state, {
      totalStoreProduct: action.value
    })
  }

  if(action.type === SETTOTALNUMBEROFMYPRODUCTS) {
    return Object.assign({}, state, {
      totalMyProduct: action.value
    })
  }

  if(action.type === PASSKEYPROD) {
    return Object.assign({}, state, {
      editProd: action.keyProd
    })
  }

  if(action.type === GETMYORDERS) {
    return Object.assign({}, state, {
      ordersList: action.ordersList
    })
  }

  if(action.type === RESETCART) {
    return Object.assign({}, state, {
      cart: []
    })
  }

  if(action.type === SETINVOICES) {
    return Object.assign({}, state, {
      invoices: action.invoices
    })
  }

  if(action.type === SETPERIODS) {
    return Object.assign({}, state, {
      periods: action.periods
    })
  }

  if(action.type === SELECTEDPERIOD) {
    return Object.assign({}, state, {
      selectedPeriod: action.period
    })
  }

  if(action.type === RESETINVOICES) {
    return Object.assign({}, state, {
      invoices: [],
      selectedPeriod: {id: "Select a quarter", amount: null, payable: false}
    })
  }


  //returning the state
  return state;
}

export const persistConfig = {
  key: 'root',
  storage: storage,
  /** 'cart', 'ordersList' prima della presentazione */
  blacklist: ['searchProduct', 'logged', 'user', 'loading', 'index', 'myProductsArray', 'totalStoreProduct', 'totalMyProduct', 'myProductsArray', 'ordersList', 'businessList', 'citizenList', 'editProd', 'periods', 'invoices', 'selectedPeriod']
};

export default persistReducer(persistConfig, rootReducer);

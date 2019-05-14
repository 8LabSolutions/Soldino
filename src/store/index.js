import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import { persistConfig, rootReducer } from '../reducers/index';

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(store);
import { createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import { persistConfig, rootReducer } from '../reducers/index';

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer);
export const persistor = persistStore(store);
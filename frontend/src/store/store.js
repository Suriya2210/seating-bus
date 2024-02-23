import { applyMiddleware, createStore } from "redux";
import reducers from "./../reducers";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const loggerMiddleware = createLogger();

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
const persistor = persistStore(store);
export {store,persistor};

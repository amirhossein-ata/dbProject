import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/rootReducer";
import logger from "redux-logger";
import rootSaga from "./sagas/index";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "wallet"],
};
const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [sagaMiddleware, logger];

export default () => {
  const createStoreWithMiddelware = composeEnhancers(
    applyMiddleware(...middlewares)
  )(createStore);

  const store = createStoreWithMiddelware(persistedReducer);
  sagaMiddleware.run(rootSaga);

  return {
    persistor: persistStore(store),
    store,
  };
};

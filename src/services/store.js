import { compose, createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_FINISH,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_SET_SOCKET,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "./actions/wsActions";

const wsUrl = "wss://norma.nomoreparties.space/orders/all";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_FINISH,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  wsSocket: WS_SET_SOCKET,
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))
);

export const store = createStore(rootReducer, enhancer);

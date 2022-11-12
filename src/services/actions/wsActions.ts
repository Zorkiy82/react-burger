import {
  WS_CONNECTION_START,
  WS_CONNECTION_FINISH,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../constants";

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWSConnectionFinishAction {
  readonly type: typeof WS_CONNECTION_FINISH;
}
export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  payload: any;
}
export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  payload: any;
}

export type TWSActions =
  | IWSConnectionStartAction
  | IWSConnectionFinishAction
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSSendMessageAction;

export const wsConnectionSuccess = (): IWSConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): IWSConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = ():IWSConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (message: any ):IWSGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};

export const wsSendMessage = (message: any): IWSSendMessageAction => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};

export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const {
        wsInit,
        wsSocket,
        wsClose,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (type === wsClose && socket) {
        console.log("перед условием закрытия :", socket.readyState);

        socket.close();

        console.log("после условия закрытия :", socket.readyState);
      }

      if (type === wsInit) {
        // console.log("перед условием открытия :", socket.readyState);
        if (socket === null) {
          socket = new WebSocket(`${wsUrl}`);
        } else if (socket.readyState === 3) {
          socket = new WebSocket(`${wsUrl}`);
        } else {
          socket.close();
          socket = new WebSocket(`${wsUrl}`);
        }
        // console.log("после условия закрытия :", socket.readyState);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};

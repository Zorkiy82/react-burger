export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { itemsCatalog } = getState().ingredients;
      const { type, payload } = action;
      const {
        wsInit,
        wsClose,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (type === wsClose && socket) {
        if (socket.readyState === 1) {
          socket.close();
        }
      }

      if (type === wsInit) {
        if (
          socket === null ||
          socket.readyState === 3 ||
          socket.readyState === 2
        ) {
          socket = new WebSocket(`${wsUrl}${payload.add}`);
        }
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        // TODO Можно лучше: было бы круто переподключать сокет
        // если он закрылся не по евенту и при необходимости обновить accessToken

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({
            type: onMessage,
            payload: {
              data: restParsedData,
              catalog: itemsCatalog,
            },
          });
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

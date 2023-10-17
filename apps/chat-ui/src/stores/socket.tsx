import { createContext } from 'react';

import { io } from 'socket.io-client';

import { SOCKET_PATH } from '~/common/constants';

export const socket = io(SOCKET_PATH, {
  path: '/api/socketio',
  extraHeaders: {
    'Access-Control-Allow-Origin': '*',
  },
});

export const SocketContext = createContext(socket);

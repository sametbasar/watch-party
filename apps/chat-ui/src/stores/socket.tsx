import { createContext } from 'react';

import { io } from 'socket.io-client';

import { SOCKET_PATH } from '~/common/constants';

export const socket = io(SOCKET_PATH, {
  path: '',
  extraHeaders: {
    'Access-Control-Allow-Origin': '*',
  },
  reconnectionDelay: 10000,
});

export const SocketContext = createContext(socket);

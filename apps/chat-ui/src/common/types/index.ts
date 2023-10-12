import { Server as HTTPServer } from 'http';
import { Socket as NetSocket } from 'net';

import { Dispatch, SetStateAction } from 'react';

import { NextApiResponse } from 'next/types';
import Peer, { MediaConnection } from 'peerjs';
import { Server as SocketIOServer } from 'socket.io';
import { Socket as ClientSocket } from 'socket.io-client';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io: SocketIOServer;
    };
  };
};

export type TSocket = ClientSocket;

export type KeyValue<T> = Record<string, T>;
export type Nullable<T> = T | null;

export type WatchContextType = {
  socket: TSocket;
  roomId: RoomId;
  peer: Peer;
  // user: Pick<UserContext, 'user'>;
  isHost: boolean;
  stream: MediaStream;
  me: boolean;
  peers: KeyValue<Peer>;
  setPeers: Dispatch<SetStateAction<KeyValue<MediaConnection>>>;
  sharedScreenTrack: Nullable<MediaStreamTrack>;
  setSharedScreenTrack: Dispatch<SetStateAction<Nullable<MediaStreamTrack>>>;
};

export type RoomId = string;

export type AppendVideoStream = ({ id, name }: { id: string; name: string }) => (stream: MediaStream) => void;

export type PeerId = string;
export type User = {
  id: string;
  name: string;
};

export type UserMessage = {
  user: string;
  text: string;
  time: string;
  shouldAggregate: boolean;
};

export type Status = 'loading' | 'idle' | 'rejected' | 'success';
export type Kind = 'audio' | 'video' | 'chat' | 'users' | 'screen' | 'fullscreen';

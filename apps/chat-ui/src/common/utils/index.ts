import { customAlphabet } from 'nanoid';
import { MediaConnection } from 'peerjs';

import { KeyValue } from '../types';

export function createRoomId(): string {
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvxyz', 10);
  return nanoid();
}

export function replaceTrack(track: MediaStreamTrack) {
  return (peer: MediaConnection) => {
    const sender = peer.peerConnection?.getSenders().find((s) => s.track?.kind === track.kind);

    sender?.replaceTrack(track);
  };
}

export function append<T>(appendant: any) {
  return (target: KeyValue<T> | T[]) => {
    if (target instanceof Array) return target.concat(appendant);

    return { ...target, ...appendant };
  };
}

export function isHost(roomId: string): boolean {
  return typeof window !== 'undefined' && !!window.localStorage.getItem(roomId);
}

export function error(message: string) {
  return (error: any) => {
    console.error(message);
    console.error(error);
  };
}

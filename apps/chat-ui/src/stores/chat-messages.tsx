import { Dispatch, createContext } from 'react';

import { Message } from '~/components/room/chat/types';

export enum MessageTypes {
  SET_MESSAGE = 'SET_MESSAGE',
}

export type IActionMessage = {
  type: keyof typeof MessageTypes;
  payload?: any;
};

export function chatMessagesReducer(state: Message[], action: IActionMessage): Message[] {
  switch (action.type) {
    case 'SET_MESSAGE':
      return [...state, action.payload];
    default:
      return state;
  }
}

export const ChatMessagesContext = createContext<{ messages: Message[]; chatDispatch: Dispatch<IActionMessage> }>(
  {} as any
);

import { Dispatch, createContext } from 'react';

import { Nullable } from '~/common/types';

export enum UserTypes {
  SET_USERNAME = 'SET_USERNAME',
  OPEN_CAMERA_CHAT = 'OPEN_CAMERA_CHAT',
  CLOSE_CAMERA_CHAT = 'CLOSE_CAMERA_CHAT',
}

export type IUser = {
  id: string;
  avatar?: string;
  name: string;
  cameraChat: boolean;
  stream?: Nullable<MediaStream>;
  visible?: boolean;
  muted?: boolean;
};

export type IAction = {
  type: keyof typeof UserTypes;
  payload?: any;
};

export function userReducer(state: IUser, action: IAction): IUser {
  switch (action.type) {
    case 'SET_USERNAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'OPEN_CAMERA_CHAT':
      return {
        ...state,
        cameraChat: true,
        stream: action.payload,
      };

    case 'CLOSE_CAMERA_CHAT':
      return {
        ...state,
        cameraChat: false,
        stream: null,
      };
    default:
      return state;
  }
}

export const UserContext = createContext<{ state: IUser; dispatch: Dispatch<IAction> }>({} as any);

/* eslint-disable no-prototype-builtins */
'use client';

import { Reducer, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';

import { useParams } from 'next/navigation';
import { VList } from 'virtua';

import { User } from '~/common/types';
import { getLocalStorage } from '~/common/utils/local-storage';
import { BottomBar } from '~/components/bottom-bar';
import { ChatMessagesContext, IActionMessage, chatMessagesReducer } from '~/stores/chat-messages';
import { SocketContext } from '~/stores/socket';
import { type IUser, UserContext } from '~/stores/user';

import { MessageBox } from './_partials';
import { UserDialog } from './_partials/user-dialog';
import { ChatSkeleton } from './skeleton';
import { type Message } from './types';
import { Stream } from '../video/stream';

export const Chat = () => {
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const { state, dispatch } = useContext(UserContext);
  const [messages, chatDispatch] = useReducer<Reducer<Message[], IActionMessage>>(chatMessagesReducer, []);
  const socket = useContext(SocketContext);

  const [loading, setIsLoading] = useState<boolean>(true);
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    socket.on('user:joined', (user: IUser) => {
      if (user.name && !user.hasOwnProperty('visible'))
        chatDispatch({
          type: 'SET_MESSAGE',
          payload: { type: 'info', username: user.name, message: `${user.name} joined to party` },
        });
      else if (user.hasOwnProperty('visible') && user.visible)
        chatDispatch({
          type: 'SET_MESSAGE',
          payload: { type: 'info', username: user.name, message: `${user.name} activated the camera chat` },
        });
    });

    socket.on('user:left', (user: string) => {
      if (user !== '')
        chatDispatch({
          type: 'SET_MESSAGE',
          payload: { type: 'info', username: user, message: `${user} leaved to party` },
        });
    });

    socket.on('chat:get', ({ message, user }: { message: string; user: User }) => {
      if (!user.hasOwnProperty('visible'))
        chatDispatch({
          type: 'SET_MESSAGE',
          payload: { type: 'message', username: user.name, message },
        });
    });
  }, [socket]);

  const showChat = () => {
    setIsLoading(false);
    setIsUser(true);
  };

  const checkUserIsLoggedIn = () => {
    if (state.id) showChat();
    const user = getLocalStorage('watch.user');
    if (user) {
      const parsedUser: Omit<IUser, 'id'> = JSON.parse(user);
      dispatch({ type: 'SET_USERNAME', payload: parsedUser.name });
      showChat();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkUserIsLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messageElements = useMemo(
    () => messages.map((d, i) => <MessageBox key={`message-${i}`} message={d} />),
    [messages]
  );

  useEffect(() => {
    chatScrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  useEffect(() => {
    if (!loading && isUser)
      socket.emit('room:join', {
        room: params.id,
        user: { id: state.id ?? '', name: state.name ?? '' },
      });
  }, [isUser, loading, params.id, socket, state.id, state.name]);

  if (loading) return <ChatSkeleton />;

  return (
    <ChatMessagesContext.Provider value={{ messages, chatDispatch }}>
      <div className="flex w-full flex-1 flex-col items-center justify-end p-5">
        {state.cameraChat && state.stream && (
          <div className="w-full flex-1">
            <Stream stream={state.stream} />
          </div>
        )}
        <VList reverse className="flex flex-col overflow-y-scroll">
          {messageElements}
          <div className="h-10" ref={chatScrollRef} />
        </VList>

        {!isUser && <UserDialog setIsUser={setIsUser} />}
        <BottomBar />
      </div>
    </ChatMessagesContext.Provider>
  );
};

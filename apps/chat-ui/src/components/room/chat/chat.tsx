'use client';

import { useContext, useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { getLocalStorage } from '~/common/utils/local-storage';
import { BottomBar } from '~/components/bottom-bar';
import { SocketContext } from '~/stores/socket';
import { type IUser, UserContext } from '~/stores/user';

import { MessageBox } from './_partials';
import { UserDialog } from './_partials/user-dialog';
import { ChatSkeleton } from './skeleton';
import { type Message } from './types';
import { Stream } from '../video/stream';

export const Chat = () => {
  const params = useParams();
  const { state, dispatch } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const [loading, setIsLoading] = useState<boolean>(true);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([] as Message[]);

  socket.on('user:joined', (user: IUser) => {
    if (user.name && !user.visible)
      setMessages([...messages, { type: 'info', username: user.name, message: `${user.name} joined to party` }]);
    else if (user.name && user.visible)
      setMessages([
        ...messages,
        { type: 'info', username: user.name, message: `${user.name} activated the camera chat` },
      ]);
  });

  socket.on('user:left', (user: string) => {
    if (user !== '') setMessages([...messages, { type: 'info', username: user, message: `${user} leaved to party` }]);
  });

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

  useEffect(() => {
    if (!loading && isUser)
      socket.emit('room:join', {
        room: params.id,
        user: { id: state.id ?? '', name: state.name ?? '' },
      });
  }, [isUser, loading, params.id, socket, state.id, state.name]);

  if (loading) return <ChatSkeleton />;

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-end p-5">
      {state.cameraChat && state.stream && (
        <div className="w-full">
          <Stream stream={state.stream} />
        </div>
      )}
      <div className="mb-2 flex h-[550px] w-full flex-col justify-end overflow-y-scroll">
        {messages.map((message, index) => {
          return <MessageBox key={`message-${index}`} message={message} />;
        })}
      </div>

      {!isUser && <UserDialog setIsUser={setIsUser} />}
      <BottomBar />
    </div>
  );
};

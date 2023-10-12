/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';

import { useParams } from 'next/navigation';

import { KeyValue, PeerId } from '~/common/types';
import { append, isHost } from '~/common/utils';
import { SocketContext } from '~/stores/socket';

export const UsersUpdaterContext = createContext<any>({});
export const UsersStateContext = createContext<any>({});

export default function UsersSettingsProvider({ children }: any) {
  const params = useParams();
  const socket = useContext(SocketContext);

  const [streams, setStreams] = useState<Record<PeerId, JSX.Element>>({});

  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});
  const [isHidden, setIsHidden] = useState<KeyValue<boolean>>({});
  const [avatars, setAvatars] = useState<KeyValue<string>>({});
  const [names, setNames] = useState<KeyValue<string>>({});

  useEffect(() => {
    socket.on('user:toggled-video', (peerId: PeerId) => {
      setTimeout(() => {
        setIsHidden(append({ [peerId]: !isHidden[peerId] }));
      }, 100);
    });
  }, [isHidden]);

  useEffect(() => {
    socket.on('user:toggled-audio', (peerId: PeerId) => {
      setTimeout(() => {
        setIsMuted(append({ [peerId]: !isMuted[peerId] }));
      }, 100);
    });
  }, [isMuted]);

  return (
    <UsersStateContext.Provider
      value={{
        streams,
        isMuted,
        isHidden,
        isHost: isHost(params.id as string),
        avatars,
        names,
      }}
    >
      <UsersUpdaterContext.Provider
        value={{
          setIsMuted,
          setIsHidden,
          setAvatars,
          setStreams,
          setNames,
          muteUser: (id: PeerId) => socket.emit('host:mute-user', id),
        }}
      >
        {children}
      </UsersUpdaterContext.Provider>
    </UsersStateContext.Provider>
  );
}

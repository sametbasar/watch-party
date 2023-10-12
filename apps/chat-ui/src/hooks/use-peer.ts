import { useContext, useEffect, useState } from 'react';

import { useParams } from 'next/navigation';
import Peer from 'peerjs';

import { Nullable, PeerId } from '~/common/types';
import { error } from '~/common/utils';
import { SocketContext } from '~/stores/socket';
import { UserContext } from '~/stores/user';

import useMediaStream from './use-media-stream';

const usePeer = (stream: Nullable<MediaStream>) => {
  const socket = useContext(SocketContext);
  const room = useParams().id as string;
  const { state } = useContext(UserContext);

  const { muted, visible } = useMediaStream(stream);

  const [isLoading, setIsLoading] = useState(true);
  const [peer, setPeer] = useState<Nullable<Peer>>(null);
  const [myId, setMyId] = useState<PeerId>('');

  useEffect(() => {
    (async function createPeerAndJoinRoom() {
      try {
        const peer = new (await import('peerjs')).default();
        setPeer(peer);

        peer.on('open', (id) => {
          console.log('your device id: ', id);
          setMyId(id);
          socket.emit('room:join', {
            room,
            user: {
              id,
              muted,
              visible,
              name: state.name,
              avatar: state.avatar,
            },
          });

          setIsLoading(false);
        });

        // peer.on('error', error('Failed to setup peer connection'));
      } catch (e) {
        error('Unable to create peer')(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    peer,
    myId,
    isPeerReady: !isLoading,
  };
};

export default usePeer;

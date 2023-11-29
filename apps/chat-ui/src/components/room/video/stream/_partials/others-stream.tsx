import { useContext } from 'react';

import { PeerId } from '~/common/types';
import { VideoContainer } from '~/components/room/video';
import { UsersStateContext } from '~/contexts/users-settings';

export default function OtherStreams() {
  const { streams, isMuted, isHidden, names } = useContext(UsersStateContext);

  return (
    <>
      {Object.entries(streams).map(([id, element]: [PeerId, any]) => (
        <VideoContainer key={id} id={id} muted={isMuted[id]} visible={!isHidden[id]} username={names[id]}>
          {element}
        </VideoContainer>
      ))}
    </>
  );
}

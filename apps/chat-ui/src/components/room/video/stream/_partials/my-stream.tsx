import { useContext } from 'react';

import { MYSELF } from '~/common/constants';
import { Nullable } from '~/common/types';
import { VideoContainer } from '~/components/room/video';
import { UsersConnectionContext } from '~/contexts/user-connection';

import { PeerVideo } from '../../_partials';

export default function MyStream({
  stream,
  muted,
  visible,
  toggleVideo,
  toggle,
}: {
  stream: MediaStream;
  muted: boolean;
  visible: boolean;
  toggle: (kind: 'audio' | 'video') => (s?: Nullable<MediaStream>) => void;
  toggleVideo: (cb?: unknown) => Promise<void>;
}) {
  const { myId } = useContext(UsersConnectionContext);

  return (
    <VideoContainer
      id={myId}
      muted={muted}
      visible={visible}
      stream={stream}
      username={MYSELF}
      toggle={toggle}
      toggleVideo={toggleVideo}
      isMe
    >
      <PeerVideo stream={stream} name={MYSELF} muted={muted} isMe={true} />
    </VideoContainer>
  );
}

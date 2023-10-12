'use client';

import { type FC } from 'react';

import UsersConnectionProvider from '~/contexts/user-connection';
import UsersSettingsProvider from '~/contexts/users-settings';
import useMediaStream from '~/hooks/use-media-stream';
import usePeer from '~/hooks/use-peer';

import Streams from './_partials/streams';

interface Props {
  stream: MediaStream;
}
export const Stream: FC<Props> = ({ stream }) => {
  const { muted, visible, toggle, toggleVideo } = useMediaStream(stream);
  const { peer, myId, isPeerReady } = usePeer(stream);

  if (isPeerReady) {
    return (
      <div className="flex w-full">
        <UsersSettingsProvider>
          <UsersConnectionProvider stream={stream} myId={myId} peer={peer}>
            <div className="flex h-full w-full place-content-center place-items-center gap-4">
              <Streams stream={stream} muted={muted} visible={visible} toggle={toggle} toggleVideo={toggleVideo} />
            </div>
          </UsersConnectionProvider>
        </UsersSettingsProvider>
      </div>
    );
  }
};

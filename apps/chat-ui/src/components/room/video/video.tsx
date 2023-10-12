import { MicrophoneIcon } from '@heroicons/react/24/outline';

import { Nullable } from '~/common/types';

import { ControlBar } from './_partials';
import VideoPlug from './_partials/video-plug';

export const VideoContainer = ({
  id,
  stream,
  visible,
  children,
  username,
  muted,
  isMe,
  toggleVideo,
  toggle,
}: SingleVideoProps) => {
  return (
    <div key={id} className="group relative h-full w-full flex-1">
      {!visible && <VideoPlug username={username} />}
      <div className={`${!visible ? 'hidden' : ''}`}>{children}</div>
      {muted && (
        <div className="absolute right-2 top-2">
          <div className="absolute left-3 top-3 h-0.5 w-full -translate-x-1/2 -rotate-45 rounded-lg bg-red-600" />
          <MicrophoneIcon className="stroke-red-600" width={25} height={25} />
        </div>
      )}
      {isMe && (
        <ControlBar
          stream={stream}
          myId={id}
          muted={muted}
          visible={visible}
          toggle={toggle}
          toggleVideo={toggleVideo}
        />
      )}
    </div>
  );
};

type SingleVideoProps = {
  id: string;
  stream?: Nullable<MediaStream>;
  muted: boolean;
  visible: boolean;
  children: React.ReactNode;
  username: string;
  isMe?: boolean;

  toggle?: (kind: 'audio' | 'video') => (s?: Nullable<MediaStream>) => void;
  toggleVideo?: (cb?: unknown) => Promise<void>;
};

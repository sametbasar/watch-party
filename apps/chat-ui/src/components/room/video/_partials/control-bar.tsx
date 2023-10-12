import { useContext, type FC } from 'react';

import { MicrophoneIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

import { Kind, Nullable } from '~/common/types';
import { SocketContext } from '~/stores/socket';

interface Props {
  myId: string;
  stream?: Nullable<MediaStream>;
  visible?: boolean;
  muted?: boolean;

  toggle?: (kind: 'audio' | 'video') => (s?: Nullable<MediaStream>) => void;
  toggleVideo?: (cb?: unknown) => Promise<void>;
}
export const ControlBar: FC<Props> = ({ stream, myId, visible, muted, toggle }) => {
  const socket = useContext(SocketContext);

  async function toggleKind(kind: Kind) {
    switch (kind) {
      case 'audio': {
        if (toggle) toggle('audio')(stream);
        socket.emit('user:toggle-audio', myId);
        return;
      }
      case 'video': {
        if (toggle) toggle('video')(stream);
        socket.emit('user:toggle-video', myId);
        return;
      }
      default:
        break;
    }
  }

  return (
    <div className="absolute bottom-1 right-2 flex items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
      <div
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-gray-600"
        onClick={() => toggleKind('video')}
      >
        <VideoCameraIcon width={16} height={16} />
      </div>

      <div
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-gray-600"
        onClick={() => toggleKind('audio')}
      >
        <MicrophoneIcon width={16} height={16} />
      </div>
    </div>
  );
};

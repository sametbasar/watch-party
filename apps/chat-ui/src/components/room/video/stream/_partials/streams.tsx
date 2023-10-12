import { Nullable } from '~/common/types';

import MyStream from './my-stream';
import OtherStreams from './others-stream';

export default function Streams({ stream, muted, visible, toggle, toggleVideo }: StreamsProps) {
  return (
    <div className="grid max-h-[600px] w-full grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <MyStream stream={stream} muted={muted} visible={visible} toggle={toggle} toggleVideo={toggleVideo} />
      <OtherStreams />
    </div>
  );
}

type StreamsProps = {
  stream: MediaStream;
  muted: boolean;
  visible: boolean;
  toggle: (kind: 'audio' | 'video') => (s?: Nullable<MediaStream>) => void;
  toggleVideo: (cb?: unknown) => Promise<void>;
};

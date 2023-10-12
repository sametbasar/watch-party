import { type FC, memo } from 'react';

interface Props {
  stream: MediaStream;
  name: string;
  isMe?: boolean;
}

const PeerVideo: FC<Props> = ({ stream, name, isMe }) => {
  return (
    <div className="relative">
      <video
        ref={(node) => {
          if (node) node.srcObject = stream;
        }}
        autoPlay
        muted={isMe}
        className="aspect-video h-full w-full -scale-x-100 rounded-lg object-cover"
      />

      <p className="absolute bottom-2 left-2 rounded bg-black/70 px-2 text-xs font-medium">
        <span className="text-white">{name}</span>
      </p>
    </div>
  );
};

export default memo(PeerVideo);

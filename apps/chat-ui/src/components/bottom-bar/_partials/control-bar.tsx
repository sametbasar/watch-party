import { FaceSmileIcon } from '@heroicons/react/24/outline';

import { VideoControl } from './video-control';

export const ControlBar = () => {
  return (
    <div className="flex flex-wrap items-center justify-between">
      <VideoControl />

      <div className="flex gap-2">
        <div className="group flex h-7 w-7 cursor-pointer items-center justify-center rounded transition-all duration-300 hover:bg-border">
          <FaceSmileIcon
            width={20}
            height={20}
            className="stroke-gray-400 transition-all duration-300 group-hover:stroke-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

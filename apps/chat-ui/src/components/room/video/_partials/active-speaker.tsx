import React from 'react';

import { MicrophoneIcon } from '@heroicons/react/24/outline';

import { Nullable } from '~/common/types';
import useIsAudioActive from '~/hooks/use-is-audio-active';

const ActiveSpeaker = ({ stream }: { stream: Nullable<MediaStream> }) =>
  useIsAudioActive({ source: stream }) ? (
    <div className="absolute right-3 top-3 rounded-full bg-gray-700 p-1">
      <MicrophoneIcon width={12} height={12} />
    </div>
  ) : null;

export default ActiveSpeaker;

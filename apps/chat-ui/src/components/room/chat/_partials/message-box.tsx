import { type FC } from 'react';

import { type Message } from '../types';

interface Props {
  message: Message;
}

export const MessageBox: FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg p-3 transition-all duration-300 hover:bg-gray-600">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#808080]">
        <span className="uppercase">{message?.username?.slice(0, 1)}</span>
      </div>
      <p className="text-sm text-gray-100">{message.message}</p>
    </div>
  );
};

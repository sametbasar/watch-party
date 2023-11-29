import { type FC } from 'react';

import { type Message } from '../types';

interface Props {
  message: Message;
}

export const MessageBox: FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-col flex-wrap rounded-lg p-3 transition-all duration-300 hover:bg-gray-600">
      <p className="text-xs font-semibold text-gray-400">{message.username}</p>
      <p className="text-sm text-gray-100">{message.message}</p>
    </div>
  );
};

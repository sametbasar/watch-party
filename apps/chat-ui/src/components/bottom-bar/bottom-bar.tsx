'use client';

import { ChatInput, ControlBar } from './_partials';

export const BottomBar = () => {
  return (
    <div className="w-full max-w-xs rounded border border-gray-500 bg-gray-700 p-2">
      <ChatInput />
      <ControlBar />
    </div>
  );
};

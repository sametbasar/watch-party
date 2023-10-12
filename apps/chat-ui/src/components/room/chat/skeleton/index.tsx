import React from 'react';

import { Loader } from '~/components/ui/loader/loader';

export const ChatSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-end gap-5">
      <div className="flex flex-col items-center gap-5">
        <p>Checking your informations...</p>
        <Loader />
      </div>
      <div className="w-full max-w-xs animate-pulse rounded border border-gray-500 bg-gray-700 p-2">
        <div className="mb-4 h-6 w-full rounded bg-gray-600"></div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="group flex h-7 w-7 cursor-pointer items-center justify-center rounded transition-all duration-300 hover:bg-border">
            <div className="h-5 w-5 rounded bg-gray-600"></div>
          </div>
          <div className="flex gap-2">
            <div className="group flex h-7 w-7 cursor-pointer items-center justify-center rounded transition-all duration-300 hover:bg-border">
              <div className="h-5 w-5 rounded bg-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

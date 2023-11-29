'use client';

import { Fragment } from 'react';

import { LinkIcon } from '@heroicons/react/24/outline';
import { HoverCard } from '@radix-ui/themes';
import { useParams } from 'next/navigation';

export const RoomInfo = () => {
  const params = useParams();

  const roomId = params.id;

  const clipboardRoomInfo = () => {
    navigator.clipboard.writeText(roomId as string);
  };

  if (!params.id) return <Fragment />;

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <button onClick={clipboardRoomInfo}>
          <LinkIcon width={20} height={20} />
        </button>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <span>{`You are now this room ${roomId}`}</span>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

import { useState } from 'react';

import { VideoCameraIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@radix-ui/themes';

import { SetupCamera } from './setup-camera';

export const VideoControl = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Trigger>
        <div className="group flex h-7 w-7 cursor-pointer items-center justify-center rounded transition-all duration-300 hover:bg-border">
          <VideoCameraIcon
            width={20}
            height={20}
            className="stroke-gray-400 transition-all duration-300 group-hover:stroke-gray-50"
          />
        </div>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: '90%', minHeight: 530 }}>
        <Dialog.Title>Setup your Camera/Mic</Dialog.Title>
        <SetupCamera setModalClose={setOpenModal} />
      </Dialog.Content>
    </Dialog.Root>
  );
};

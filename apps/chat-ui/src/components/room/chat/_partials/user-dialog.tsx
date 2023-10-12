import { type Dispatch, type SetStateAction, useState, type FC } from 'react';

import { AlertDialog } from '@radix-ui/themes';

import { UserLogin } from '~/components/lobby';

interface Props {
  setIsUser: Dispatch<SetStateAction<boolean>>;
}
export const UserDialog: FC<Props> = ({ setIsUser }) => {
  const [openModal, setOpenModal] = useState(true);

  const onSubmit = () => {
    setOpenModal(false);
    setIsUser(true);
  };

  return (
    <AlertDialog.Root open={openModal} onOpenChange={setOpenModal}>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Login</AlertDialog.Title>
        <UserLogin onSubmit={onSubmit} />
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

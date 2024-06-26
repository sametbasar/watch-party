'use client';

import { type FC, FormEvent, useContext, useState, useLayoutEffect } from 'react';

import { UserIcon } from '@heroicons/react/24/outline';
import { Button, TextField } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

import { createRoomId } from '~/common/utils';
import { getLocalStorage, setLocalStorage } from '~/common/utils/local-storage';
import { Loader } from '~/components/ui/loader/loader';
import { IUser, UserContext } from '~/stores/user';

interface Props {
  onSubmit?: () => void;
}
export const UserLogin: FC<Props> = ({ onSubmit }) => {
  const [pageLoading, setPageLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { dispatch } = useContext(UserContext);
  const [name, setName] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '') {
      toast('Cannot be empty name.', { type: 'error' });
      return;
    }
    dispatch({ type: 'SET_USERNAME', payload: name });
    setLocalStorage('watch.user', JSON.stringify({ name, avatar: '' }));
    if (onSubmit) {
      onSubmit();
      return;
    }
    toast('Saved username, Redirecting to chat', { type: 'info' });
    const roomId = searchParams.get('wid') ?? createRoomId();
    router.push(`/room/${roomId}`);
  };

  const checkUserExistLocalStroage = () => {
    const stringUser = getLocalStorage('watch.user');
    const user: IUser | null = (stringUser && JSON.parse(stringUser ?? '')) ?? null;
    if (user && user.name) {
      const roomId = searchParams.get('wid') ?? createRoomId();
      router.push(`/room/${roomId}`);
    } else setPageLoading(false);
  };

  useLayoutEffect(() => {
    checkUserExistLocalStroage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pageLoading) return <Loader />;

  return (
    <form className="flex w-full max-w-sm flex-col gap-5" onSubmit={handleSubmit}>
      <TextField.Root>
        <TextField.Slot>
          <UserIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input placeholder="Name" size="3" onChange={(e) => setName(e.target.value)} />
      </TextField.Root>

      <Button size="3">Join Room</Button>
    </form>
  );
};

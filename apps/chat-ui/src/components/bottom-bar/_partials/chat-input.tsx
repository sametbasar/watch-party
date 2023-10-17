import { useContext } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { ChatMessagesContext } from '~/stores/chat-messages';
import { SocketContext } from '~/stores/socket';
import { UserContext } from '~/stores/user';

interface IChatInput {
  message: string;
}

const schema = yup.object({
  message: yup.string().required('Boş mesaj gönderilemez.'),
});

export const ChatInput = () => {
  const { register, handleSubmit, reset } = useForm<IChatInput>({
    resolver: yupResolver(schema),
  });
  const { state } = useContext(UserContext);
  const { chatDispatch } = useContext(ChatMessagesContext);
  const socket = useContext(SocketContext);

  const onSubmit = (values: IChatInput) => {
    socket.emit('chat:post', { message: values.message, username: state.name });
    chatDispatch({
      type: 'SET_MESSAGE',
      payload: {
        type: 'message',
        username: state.name,
        message: values.message,
      },
    });
    reset();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField.Input
          size="2"
          placeholder="Start chatting…"
          onKeyDown={(e) => onKeyDown(e)}
          autoComplete="off"
          {...register('message')}
        />
      </form>
    </div>
  );
};

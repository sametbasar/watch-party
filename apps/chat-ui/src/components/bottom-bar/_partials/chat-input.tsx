import { TextField } from '@radix-ui/themes';

export const ChatInput = () => {
  return (
    <div className="mb-4">
      <TextField.Input size="1" placeholder="Start chatting…" />
    </div>
  );
};

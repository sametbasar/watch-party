import { Chat } from '~/components/room';

export default function Room() {
  return (
    <main className="flex h-[calc(100%_-_78px)] flex-1 flex-col items-center justify-between">
      <Chat />
    </main>
  );
}

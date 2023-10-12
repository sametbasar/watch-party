import { Heading } from '@radix-ui/themes';

import { UserLogin } from '~/components/lobby';

export default function Lobby() {
  return (
    <main className="flex h-[calc(100%_-_78px)] flex-1 flex-col items-center justify-center gap-6">
      <Heading size="8">Enter Room</Heading>
      <UserLogin />
    </main>
  );
}

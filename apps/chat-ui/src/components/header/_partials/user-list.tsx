import { UsersIcon } from '@heroicons/react/24/outline';

export const UserList = () => {
  return (
    <div className="flex items-center gap-1 bg-gray-600 p-2">
      <UsersIcon width={13} height={13} className="stroke-gray-50" />
      <span className="text-xs font-light">0</span>
    </div>
  );
};

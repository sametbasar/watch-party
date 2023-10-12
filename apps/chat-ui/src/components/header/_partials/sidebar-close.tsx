import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@radix-ui/themes';

export const SidebarClose = () => {
  return (
    <Tooltip content="Close sidebar">
      <div className="h-5 w-5">
        <ArrowRightIcon width={18} height={18} className="fill-gray-50" />
      </div>
    </Tooltip>
  );
};

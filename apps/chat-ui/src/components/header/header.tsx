import { Button } from '@radix-ui/themes';

import { RoomInfo, SidebarClose } from './_partials';
import { Logo } from '../logo';

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b border-b-border py-3">
      <div className="flex items-center gap-4">
        <SidebarClose />
        <Logo />
      </div>
      <div className="flex items-center gap-3">
        <RoomInfo />
        <Button color="red" variant="soft">
          Exit Party
        </Button>
      </div>
    </div>
  );
};

export default Header;

'use client';

import { type FC, Fragment } from 'react';

import { Providers } from '~/components/providers';

type Props = {
  children: React.ReactNode;
};

const LayoutClient: FC<Props> = ({ children }) => {
  return (
    <Fragment>
      <Providers>{children} </Providers>
    </Fragment>
  );
};

export default LayoutClient;

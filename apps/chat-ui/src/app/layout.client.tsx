'use client';

import { type FC, Fragment, useEffect } from 'react';

import { Providers } from '~/components/providers';

type Props = {
  children: React.ReactNode;
};

const LayoutClient: FC<Props> = ({ children }) => {
  useEffect(() => {
    window.addEventListener('message', (evt: any) => {
      // if (evt.origin !== "http://example.com") return;
      if (evt.data.type === 'GetUserInfo') {
        const username = localStorage.getItem('watch.user');
        evt.source.postMessage(username, evt.origin);
      }
    });
  }, []);
  return (
    <Fragment>
      <Providers>{children} </Providers>
    </Fragment>
  );
};

export default LayoutClient;

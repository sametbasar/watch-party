'use client';

import { type FC, Fragment } from 'react';

type Props = {
  children: React.ReactNode;
};

const LayoutClient: FC<Props> = ({ children }) => {
  // io('https://watch-party-api.vercel.app/api/socketio', {
  //   path: '/api/socketio',
  //   extraHeaders: {
  //     'Access-Control-Allow-Origin': '*',
  //   },
  // });

  return <Fragment>Samet</Fragment>;
};

export default LayoutClient;

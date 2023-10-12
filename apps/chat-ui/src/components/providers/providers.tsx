import { type FC, Fragment, useReducer, Reducer } from 'react';

import { ToastContainer } from 'react-toastify';

import { SocketContext, socket } from '~/stores/socket';
import { IAction, IUser, UserContext, userReducer } from '~/stores/user';

export const Providers: FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<IUser, IAction>>(userReducer, {
    id: '',
    name: '',
    avatar: '',
    cameraChat: false,
  });

  return (
    <Fragment>
      <SocketContext.Provider value={socket}>
        <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
      </SocketContext.Provider>
      <ToastContainer
        className="w-1/2"
        toastClassName="text-xs"
        position="bottom-center"
        newestOnTop={true}
        pauseOnFocusLoss={false}
        hideProgressBar={true}
        autoClose={1000}
      />
    </Fragment>
  );
};

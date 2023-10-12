export type Message = {
  type: 'info' | 'message';
  username: string;
  avatar?: string;
  message: string;
};

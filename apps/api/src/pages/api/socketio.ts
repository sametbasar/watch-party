/* eslint-disable no-console */
import { NextApiRequest } from 'next'
import { NextApiResponseServerIO } from 'types/next'
import { Server as ServerIO } from 'socket.io'
import { Server as NetServer } from 'http'

export const config = {
  api: {
    bodyParser: false,
  },
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log('New Socket.io server...')
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: '/api/socketio',
      cors: {
        origin: '*',
      },
    })

    io.on('connection', socket => {
      socket.on('room:join', ({ room, user }: any) => {
        // console.table({
        //   'room-id': room,
        //   'used-id': user.id,
        //   'user-name': user.name,
        // })

        socket.join(room)

        socket.to(room).emit('user:joined', user)

        socket.on('disconnect', () => {
          socket.to(room).emit('user:left', user.name)
        })

        socket.on('user:leave', (name: string) => {
          socket.to(room).emit('user:left', { name })
        })

        socket.on('host:mute-user', (userId: string) => {
          socket.to(room).emit('host:muted-user', userId)
        })

        socket.on('user:toggle-audio', (userId: string) => {
          socket.to(room).emit('user:toggled-audio', userId)
        })

        socket.on('user:toggle-video', (userId: string) => {
          console.log(userId, 'toggle-video')
          socket.to(room).emit('user:toggled-video', userId)
        })

        socket.on('chat:post', (message: string) => {
          socket.to(room).emit('chat:get', message)
        })
      })
    })
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io
  }
  res.end()
}

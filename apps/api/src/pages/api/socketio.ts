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
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: '/api/socketio',
      cors: {
        origin: '*',
        preflightContinue: true,
      },
    })

    io.on('connection', socket => {
      socket.on('room:join', ({ room, user }: any) => {
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
          socket.to(room).emit('user:toggled-video', userId)
        })

        socket.on(
          'chat:post',
          ({ username, message }: { username: string; message: string }) => {
            socket.to(room).emit('chat:get', { username, message, user })
          }
        )
      })
    })
    res.socket.server.io = io
  }
  res.end()
}

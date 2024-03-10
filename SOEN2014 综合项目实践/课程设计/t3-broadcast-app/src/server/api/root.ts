import net from 'node:net';

import { applyWSSHandler } from '@trpc/server/adapters/ws';
import kill from 'kill-port';
import { WebSocketServer } from 'ws';

import { createTRPCRouter } from '@/server/api/trpc';

import { chatroomRouter } from './routers/chatroom';
import { courseRouter } from './routers/course';
import { courseWareRouter } from './routers/course-ware';
import { exampleRouter } from './routers/example';
import { fileRouter } from './routers/file';
import { lessonRouter } from './routers/lesson';
import { quizRouter } from './routers/quiz';
import { userRouter } from './routers/user';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  chatroom: chatroomRouter,
  course: courseRouter,
  courseWare: courseWareRouter,
  example: exampleRouter,
  file: fileRouter,
  lesson: lessonRouter,
  quiz: quizRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/* Web Socket Server */
const PORT = 3001;

const startWebSocketServer = () => {
  console.log('🚀 WebSocket Server starting...');

  const wss = new WebSocketServer({ port: PORT });
  const handler = applyWSSHandler({
    wss,
    router: appRouter,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return
    createContext: ({ req, res }) => ({ req, res } as any),
  });

  wss.on('connection', (ws) => {
    console.log(`➕➕ Connection (${wss.clients.size})`);
    ws.once('close', () => {
      console.log(`➖➖ Connection (${wss.clients.size})`);
    });
  });

  console.log(`✅ WebSocket Server listening on ws://localhost:${PORT}`);

  const cleanupServer = () => {
    console.log('🚨 WebSocket Server shutting down...');
    handler.broadcastReconnectNotification();
    wss.close((err) => {
      if (err) {
        console.error(err);
      }
      process.exit(0);
    });
  };

  process.on('exit', cleanupServer);
  process.on('SIGINT', cleanupServer);
  process.on('SIGTERM', cleanupServer);
  process.on('SIGUSR1', cleanupServer);
  process.on('SIGUSR2', cleanupServer);
  process.on('uncaughtException', cleanupServer);
};

// Check whether PORT is available
const testServer = net.createServer();
testServer.once('error', (err) => {
  if ((err as unknown as { code: string }).code === 'EADDRINUSE') {
    console.log(`🚨 Port ${PORT} is busy`);
    console.log('🚨 Trying to kill the process using the port...');
    void kill(PORT, 'tcp')
      .then(() => {
        console.log(`✅ Process on port ${PORT} killed`);
        startWebSocketServer();
      })
      .catch(() => {
        console.log(`🚨 Failed to kill process on port ${PORT}`);
        console.log('🚨 Cancelled WebSocket server startup');
      });
  }
});

testServer.once('listening', () => {
  testServer.close(startWebSocketServer);
});

testServer.listen(PORT);

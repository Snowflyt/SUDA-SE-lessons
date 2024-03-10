import { createNextApiHandler } from '@trpc/server/adapters/next';

import { env } from '@/env.mjs';
import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ error, path }) => {
          console.error(
            `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`,
          );
        }
      : undefined,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

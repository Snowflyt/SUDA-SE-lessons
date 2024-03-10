/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import {
  createWSClient,
  httpBatchLink,
  loggerLink,
  wsLink,
  splitLink,
} from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import superjson from 'superjson';

import type { AppRouter } from '@/server/api/root';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // Browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // Dev SSR should use localhost
};

const getEndingLink = () => {
  const client = createWSClient({
    url: `ws://localhost:3001`,
  });

  if (typeof window === 'undefined') {
    return httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    });
  } else {
    return splitLink({
      condition: (op) => op.type === 'subscription',
      true: wsLink<AppRouter>({ client }),
      false: httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
      }),
    });
  }
};

/** A set of type-safe react-query hooks for your tRPC API. */
export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      /**
       * Transformer used for data de-serialization from the server.
       *
       * @see https://trpc.io/docs/data-transformers
       */
      transformer: superjson,

      /**
       * Links used to determine request flow from client to server.
       *
       * @see https://trpc.io/docs/links
       */
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        getEndingLink(),
      ],
    };
  },
  /**
   * Whether tRPC should await queries when server rendering pages.
   *
   * @see https://trpc.io/docs/nextjs#ssr-boolean-default-false
   */
  ssr: false,
});

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

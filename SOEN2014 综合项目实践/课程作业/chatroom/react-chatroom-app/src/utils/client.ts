import { createClient } from 'graphql-intuitive-request';

import { getToken, setToken } from './auth';

import { $ } from '@/types/graphql';

export const { mutation, query, subscription } = createClient('http://localhost:3000/graphql', {
  requestMiddleware: (request) => {
    const token = getToken();
    if (token !== null && token !== '' && request.operationName !== 'login')
      request.headers = { ...request.headers, Authorization: `Bearer ${token}` };
    return request;
  },
  responseMiddleware: (response) => {
    if (response instanceof Error) return;
    const token = response.headers.get('Authorization') ?? null;
    if (token != null) setToken(token);
  },
})
  .withWebSocketClient({
    url: 'ws://localhost:3000/graphql',
    connectionParams: () => {
      const token = getToken();
      if (token !== null && token !== '') return { headers: { Authorization: `Bearer ${token}` } };
      return { headers: {} };
    },
  })
  .withSchema($);

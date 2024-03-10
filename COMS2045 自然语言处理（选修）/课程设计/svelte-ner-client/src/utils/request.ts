let proxyURL = 'http://localhost:8000';

export const getProxyURL = () => proxyURL;
export const setProxyURL = (url: string): void => {
  proxyURL = url;
};

export type RequestOptions = Omit<RequestInit, 'body'> & {
  params?: Record<string, string | number | boolean | null | undefined>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  auth?: boolean;
};

const request = async <T = unknown>(
  url: string,
  options: RequestOptions = {},
): Promise<T> => {
  const processedUrl = new URL(
    url.startsWith('/api') ? url.replace('/api', proxyURL) : url,
  );
  if (options.params !== undefined) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      processedUrl.searchParams.append(key, value.toString());
    });
  }
  const response = await fetch(processedUrl, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(options.data),
  });
  if (response.ok) {
    try {
      return (await response.json()) as T;
    } catch {
      return '' as unknown as T;
    }
  }
  console.log(await response.json());
  throw new Error(response.statusText);
};

export default request;

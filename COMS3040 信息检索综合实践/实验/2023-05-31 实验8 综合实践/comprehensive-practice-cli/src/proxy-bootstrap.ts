import * as globalAgent from 'global-agent';

const HTTP_PROXY_URL = 'http://127.0.0.1:10809';

process.env.GLOBAL_AGENT_HTTP_PROXY = HTTP_PROXY_URL;
process.env.GLOBAL_AGENT_HTTPS_PROXY = HTTP_PROXY_URL;

globalAgent.bootstrap();

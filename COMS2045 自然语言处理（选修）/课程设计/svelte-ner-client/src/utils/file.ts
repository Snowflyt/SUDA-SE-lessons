import { invoke } from '@tauri-apps/api/tauri';

import { logged } from './log';

export const readFile = async (pathname: string) => {
  return await invoke<string>('read_file', { pathname });
};
export const loggedReadFile = logged({
  message: ({ __callStack: [[, [pathname]]] }) => `Read file from ${pathname}`,
  fn: readFile,
});

export const readJSON = async <T extends object>(pathname: string) => {
  const content = await invoke<string>('read_file', { pathname });
  return JSON.parse(content) as T;
};
export const loggedReadJSON = logged({
  message: ({ __callStack: [[, [pathname]]] }) => `Read JSON from ${pathname}`,
  fn: readJSON,
});

export const saveFile = async (pathname: string, content: string) => {
  return await invoke<void>('save_file', { pathname, content });
};

export const saveJSON = async (pathname: string, content: object) => {
  return await invoke<void>('save_json', { pathname, content });
};

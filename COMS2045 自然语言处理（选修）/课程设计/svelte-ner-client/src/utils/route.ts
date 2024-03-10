import type { SvelteComponentTyped as Component } from 'svelte';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ConstructorOf<T> = new (...args: any[]) => T;

export interface Route {
  path: string;
  name: string;
  icon?: string | Component;
  component: ConstructorOf<Component> | (() => Promise<unknown>);
}

export const createRoutes = <const T extends readonly Route[]>(routes: T): T =>
  routes;

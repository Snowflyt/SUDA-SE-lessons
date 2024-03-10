export default class Event<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TEvents extends Record<string, (...args: any[]) => any>,
> {
  listeners: Partial<{
    [P in keyof TEvents]: Array<TEvents[P]>;
  }>;
  type: string;

  constructor(type?: string) {
    this.listeners = {};
    this.type = type ?? '';
  }

  on<TEvent extends keyof TEvents>(event: TEvent, fn: TEvents[TEvent]) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(fn);
    return true;
  }

  off<TEvent extends keyof TEvents>(event: TEvent, fn: TEvents[TEvent]) {
    if (this.listeners[event]) {
      const index = this.listeners[event]!.indexOf(fn);
      if (index > -1) {
        this.listeners[event]!.splice(index, 1);
      }
      return true;
    }
    return false;
  }

  offAll() {
    this.listeners = {};
  }

  dispatch<TEvent extends keyof TEvents>(
    event: TEvent,
    data?: Parameters<TEvents[TEvent]>[0],
  ) {
    if (this.listeners[event]) {
      this.listeners[event]!.map((each) => {
        each.apply(null, [data]);
      });
      return true;
    }
    return false;
  }
}

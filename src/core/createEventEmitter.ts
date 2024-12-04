type Listener = (...args: any[]) => void;
type EventMap = Map<string, Set<Listener>>;

export const createEventEmitter = () => {
  const events: EventMap = new Map();

  const on = (event: string, callback: Listener) => {
    if (!events.has(event)) {
      events.set(event, new Set());
    }
    events.get(event)?.add(callback);
  };

  const off = (event: string, callback: Listener) => {
    events.get(event)?.delete(callback);
  };

  const emit = (event: string, ...args: any[]) => {
    events.get(event)?.forEach((callback) => callback(...args));
  };

  return { on, off, emit };
};

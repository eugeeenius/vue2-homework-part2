const resolvedPromise = Promise.resolve();
export function nextTick(fn) {
  return resolvedPromise.then(fn);
}

const queue = [];
let has = {};
let waiting = false;

export function queueFn(fn) {
  const id = fn.id;
  if (!has[id]) {
    has[id] = true;
    queue.push(fn);

    if (!waiting) {
      waiting = true;
      nextTick(flushQueue);
    }
  }
}

export function flushQueue() {
  for (let i = 0; i < queue.length; i++) {
    const fn = queue[i];
    const id = fn.id;
    has[id] = null;
    fn();
  }

  queue.length = 0;
  has = {};
  waiting = false;
}

import { queueFn } from "./async-queue";

let nextId = 0;
let activeEffect = null;
export function watchEffect(fn) {
  if (fn.id === undefined) {
    fn.id = ++nextId;
  }

  activeEffect = fn;
  fn();
  activeEffect = null;
}

export function reactive(obj) {
  if (Array.isArray(obj)) {
    return reactiveArray(obj);
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    reactiveObject(obj);
  }
  return obj;
}

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

function reactiveArray(array) {
  const result = {};
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    result[i] = value;
  }
  result.length = array.length;
  result.__proto__ = arrayMethods;
  return reactiveObject(result);
}

function reactiveObject(obj) {
  Object.keys(obj).forEach(key => {
    const dep = new Dep();
    let value = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        dep.depend();
        return value;
      },
      set(newValue) {
        if (newValue !== value) {
          value = newValue;
          dep.notify();
        }
      }
    });
  });
  return obj;
}

class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  notify() {
    this.subscribers.forEach(subscriber => queueFn(subscriber));
  }
}

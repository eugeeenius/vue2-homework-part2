import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";
import { reactive, watchEffect } from "./reactive";

// https://github.com/snabbdom/snabbdom#key--string--number

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

const app = document.getElementById("app");

// eslint-disable-next-line no-unused-vars
const state = reactive({
  count: 0
});

// eslint-disable-next-line no-unused-vars
const stateArray = reactive([
  {
    id: 1,
    title: "Title"
  },
  {
    id: 2,
    title: "Title"
  }
]);

function render() {
  return h("h1", null, `Hello`);
}

let previousVnode = null;
watchEffect(() => {
  const vnode = render();
  patch(previousVnode || app, vnode);
  previousVnode = vnode;
});

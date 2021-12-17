import {
	init,
	classModule,
	propsModule,
	styleModule,
	eventListenersModule,
	h, attributesModule
} from "snabbdom";
import { reactive, watchEffect } from "./reactive";

// https://github.com/snabbdom/snabbdom#key--string--number

const patch = init([
	classModule,
	propsModule,
	styleModule,
	attributesModule,
	eventListenersModule
]);

const app = document.getElementById("app");

// eslint-disable-next-line no-unused-vars
let state = reactive({
	dialogs: [
		{
			id: 1,
			img: new URL("../public/1.jpg", import.meta.url).href,
			name: "Jane",
			message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
		},
		{
			id: 2,
			img: new URL("../public/2.jpg", import.meta.url).href,
			name: "Alice",
			message: "Qui quibusdam quo ratione repellendus sit tenetur ut voluptatum?"
		},
		{
			id: 3,
			img: new URL("../public/3.jpg", import.meta.url).href,
			name: "Mark",
			message: "distinctio ducimus earum est et expedita "
		},
		{
			id: 4,
			img: new URL("../public/4.jpg", import.meta.url).href,
			name: "Caroline",
			message: "provident quaerat quam qui, quibusdam sint vero."
		},
		{
			id: 5,
			img: new URL("../public/5.jpg", import.meta.url).href,
			name: "Beth",
			message: "Qui quibusdam quo ratione repellendus sit tenetur ut voluptatum?"
		},
		{
			id: 6,
			img: new URL("../public/6.jpg", import.meta.url).href,
			name: "Jacob",
			message: "consectetur adipisicing elit."
		}
	]
});

const makeListItem = (id, img, name, message) => {
	const imgNode = h("img", {
		class: { "user-list-item__picture": true },
		attrs: { src: img }
	});

	const textNode = h("div", { class: { "user-list-item__text": true } },
		[
			h("h2", {}, name),
			h("p", {}, message)
		]);

	return h("li", {
		class: { "user-list-item": true },
		on: { click: removeItem(id) }
	}, [imgNode, textNode]);

	function removeItem(itemId) {
		return function() {
			state.dialogs = state.dialogs.filter(d => d.id !== itemId);
		}
	}
};

function render() {
	const dialogsNodes = state.dialogs.map(el => {
		return makeListItem(el.id, el.img, el.name, el.message);
	});

	return h("ul", { class: { "user-list": true } }, dialogsNodes);
}

let previousVnode = null;
watchEffect(() => {
	const vnode = render();
	patch(previousVnode || app, vnode);
	previousVnode = vnode;
});

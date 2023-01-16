import { handleMessage, target } from "./worker";

const sw = self as unknown as SharedWorkerGlobalScope;

sw.addEventListener("connect", (evt) => {
	const port = evt.ports[0];
	target.ports.push(port);

	port.start();

	port.addEventListener("message", handleMessage);
});

target.shared = true;

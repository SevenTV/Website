import { handleMessage, target } from "./worker";

const dw = self as unknown as DedicatedWorkerGlobalScope;

dw.addEventListener("message", handleMessage);

target.bc = new BroadcastChannel("WorkerEvents");

import { handleMessage, target } from "./Worker";

const dw = self as unknown as DedicatedWorkerGlobalScope;

dw.addEventListener("message", handleMessage);

target.bc = new BroadcastChannel("WorkerEvents");

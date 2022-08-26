/// <reference lib="webworker" />

const worker = self as unknown as ServiceWorkerGlobalScope;

worker.addEventListener('install', () => {});
worker.addEventListener('activate', () => {});
worker.addEventListener('fetch', () => {});
worker.addEventListener('message', () => {});

const channel = new BroadcastChannel('tabs');
//let UID = Date.now();
let data: number[] = [];

channel.addEventListener('message', (e: MessageEvent) => {
	if (e && e.data && e.data.type === 'page/mount') {
		data = [...data, e.data.UID];

		//console.log("service",e);
		if (data.length > 2) {
			channel.postMessage({ type: 'page/denied', UID: e.data.UID });
		} else {
			channel.postMessage({ type: 'page/add', UID: data });
		}
	}
	if (e && e.data && e.data.type === 'page/destroy') {
		const index = data.indexOf(e.data.UID);
		data.splice(index, 1);
		channel.postMessage({ type: 'page/modify', UID: data });
	}
});

export {};

/// <reference lib="webworker" />

const worker = self as unknown as ServiceWorkerGlobalScope;

worker.addEventListener('install', () => {});
worker.addEventListener('activate', () => {});
worker.addEventListener('fetch', () => {});
worker.addEventListener('message', () => {});

const channel = new BroadcastChannel('tabs');
//let UID = Date.now();
let data: number[] = [];
let deniedAccess: number[] = [];
channel.addEventListener('message', (e: MessageEvent) => {
	if (e && e.data && e.data.type === 'page/mount') {
		//console.log("service",e);
		if (data.length > 2) {
			deniedAccess = [...deniedAccess, e.data.UID];
			channel.postMessage({ type: 'page/denied', UID: deniedAccess });
		} else {
			data = [...data, e.data.UID];

			channel.postMessage({ type: 'page/add', UID: data });
		}
	}
	if (e && e.data && e.data.type === 'page/destroy') {
		const index = data.indexOf(e.data.UID);
		data.splice(index, 1);
		deniedAccess = [];
		channel.postMessage({ type: 'page/modify', UID: data });
	}
});

export {};

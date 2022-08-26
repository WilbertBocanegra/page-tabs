import { writable, type Writable } from 'svelte/store';

const date: Writable<number> = writable(Date.now());

interface Props {
	uid: number;
	position?: number;
}
const clientActual: Writable<Props> = writable({ uid: Date.now(), position: undefined });

export const error: Writable<boolean> = writable(false);

export { date, clientActual };

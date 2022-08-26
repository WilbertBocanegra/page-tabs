<script lang="ts">
	import './app.css';
	import { onMount, afterUpdate } from 'svelte';
	import { error } from '$lib/store';
	import { beforeNavigate } from '$app/navigation';
	const channel = new BroadcastChannel('tabs');
	let data: number[] = [];
	let UID = Date.now();

	channel.addEventListener('message', (e: MessageEvent) => {
		//console.log(e);
		if (e && e.data && e.data.type === 'page/add') {
			data = e.data.UID;
		}
		if (e && e.data && e.data.type === 'page/modify') {
			data = e.data.UID;

			$error = false;
		}
		if (e && e.data && e.data.type === 'page/denied') {
			if (e.data.UID === UID) {
				$error = true;
				//alert('tu no comes cabra zarabanbiche');
			} else {
				$error = false;
			}
		}
	});

	onMount(() => {
		channel.postMessage({ type: 'page/mount', UID });
	});

	beforeNavigate(() => {
		channel.postMessage({ type: 'page/destroy', UID });
	});
</script>

{#if $error}
	<div class="min-h-screen grid place-content-center px-10">
		<h1 class="uppercase font-mono text-center tracking-widest text-2xl">
			para usar esta pestaña debe de cerrar alguna abierta del sistema, recargar otra pestaña hará
			que tome este lugar
		</h1>
	</div>
{:else}
	<slot />
{/if}

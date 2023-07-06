<script>
	import "mapbox-gl/dist/mapbox-gl.css";
	import mapboxgl from "mapbox-gl";
	import Ulysses from "ulysses-js";

	import { onMount } from "svelte";

	import steps from "./content/data.json";

	/**
	 * @type {HTMLDivElement}
	 */
	let container;
	let map;
	let story;

	// satellite streets
	const style = "mapbox://styles/muckrock/cljq68fy000tl01qua57x9mxk";

	onMount(() => {
		map = new mapboxgl.Map({
			container,
			style,
			accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
			interactive: false,
		}).on("load", onLoad);
	});

	function onLoad() {
		map.resize();
	}
</script>

<div class="stick-this">
	<div class="map" bind:this={container} />
</div>

<div class="narrative">
	{#each steps.features as feature}
		{@const p = feature.properties}
		<div class="step">
			<h2>{p.title}</h2>
			<p>{p.description}</p>
		</div>
	{/each}
</div>

<style>
	.stick-this {
		position: sticky;
		top: 0;
		height: 70vh;
		width: 100%;
	}

	.map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
	}

	.narrative {
		position: relative;
		z-index: 10;
		max-width: 66ch;
		margin: 0 auto;
	}

	.step {
		background-color: rgba(0, 0, 0, 0.75);
		color: white;
		padding: 1em;
		margin-bottom: 85vh;
	}
</style>

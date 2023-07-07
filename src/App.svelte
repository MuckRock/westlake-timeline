<script>
	import "mapbox-gl/dist/mapbox-gl.css";
	// @ts-ignore
	import mapboxgl from "mapbox-gl";
	// @ts-ignore
	import Ulysses from "ulysses-js";
	// @ts-ignore
	import scroll from "ulysses-js/plugins/scroll";

	import { onMount } from "svelte";

	import steps from "./content/data.json";

	/**
	 * @type {HTMLDivElement}
	 */
	let container;
	let map;
	let story;

	// satellite streets
	// const style = "mapbox://styles/muckrock/cljq68fy000tl01qua57x9mxk";

	// streets
	const style = "mapbox://styles/muckrock/cljrmbf57016p01pg7aoi4mac";

	onMount(() => {
		map = new mapboxgl.Map({
			container,
			style,
			accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
			interactive: false,
			maxZoom: 13,
		}).on("load", onLoad);

		story = new Ulysses({
			map,
			steps,
			plugins: [scroll({ step: ".step", debug: import.meta.env.DEV })],
		});

		story.on("step", onStep);

		// @ts-ignore
		window.map = map;
	});

	function onStep({ step, feature }) {
		// console.log(feature);
	}

	function onLoad() {
		map.resize();

		map.addSource("steps", {
			type: "geojson",
			data: steps,
		});

		map.addLayer({
			id: "steps-border",
			type: "line",
			source: "steps",
			paint: {
				"line-color": "#B42222",
				"line-width": 2,
			},
			filter: ["==", "$type", "Polygon"],
		});

		map.addLayer({
			id: "steps-points",
			type: "circle",
			source: "steps",
			paint: {
				"circle-radius": 6,
				"circle-color": "#B42222",
			},
			filter: ["==", "$type", "Point"],
		});
	}
</script>

<div class="stick-this">
	<div class="map" bind:this={container} />
</div>

<div class="narrative">
	{#each steps.features as feature}
		{@const p = feature.properties}
		<section class="step">
			<div>
				<h2>{p.title}</h2>
				<p>{p.description}</p>
			</div>
		</section>
	{/each}
</div>

<style>
	:global(:root) {
		--nav-height: 42px;
	}

	:global(body > div.container) {
		/* make position sticky work on MuckRock */
		overflow: visible !important;
	}

	.stick-this {
		position: sticky;
		top: var(--nav-height, 0);
		height: 90vh;
		width: 100%;
	}

	.map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
	}

	.narrative {
		pointer-events: none;
		position: relative;
		margin-top: -50vh;
	}

	.step {
		height: 100vh;
		padding-top: 15vh;
		pointer-events: none;
	}

	.step:first-of-type {
		padding-top: 0;
	}

	.step div {
		background: rgba(0, 0, 0, 0.75);
		margin: 0 auto;
		max-width: 60ch;
		padding: 1em;
		pointer-events: all;
	}

	.step div * {
		color: white;
		margin-bottom: 1em;
	}
</style>

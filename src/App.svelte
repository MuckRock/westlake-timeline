<script>
	import "mapbox-gl/dist/mapbox-gl.css";
	import mapboxgl from "mapbox-gl";
	import bbox from "@turf/bbox";
	import Ulysses from "ulysses-js";
	import scroll from "ulysses-js/plugins/scroll";

	import { onMount } from "svelte";

	import steps from "./content/data.json";

	/**
	 * @type {HTMLDivElement}
	 */
	let container;
	let map;
	let story;
	let highlight;

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
			maxZoom: 15,
			bounds: bbox(steps.features[0]),
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
		if (!map.style.loaded) return;

		if (highlight) {
			map.setFeatureState(
				{
					source: "steps",
					id: highlight.id,
				},
				{ highlight: false }
			);
		}

		map.once("moveend", () => {
			map.setFeatureState(
				{
					source: "steps",
					id: feature.id,
				},
				{ highlight: true }
			);
		});

		highlight = feature;
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
				"line-opacity": ["case", ["boolean", ["feature-state", "highlight"], false], 1, 0.25],
			},
			transition: {
				duration: 300,
				delay: 0,
			},
			filter: ["!=", "$type", "Point"],
		});

		map.addLayer({
			id: "steps-points",
			type: "circle",
			source: "steps",
			paint: {
				"circle-radius": 6,
				"circle-color": "#B42222",
				"circle-opacity": ["case", ["boolean", ["feature-state", "highlight"], false], 1, 0.25],
			},
			transition: {
				duration: 300,
				delay: 0,
			},

			filter: ["==", "$type", "Point"],
		});
	}
</script>

<div class="stick-this">
	<div class="map big" bind:this={container} />
</div>

<div class="narrative big">
	{#each steps.features as feature}
		{@const p = feature.properties}
		<section class="step {p.position}">
			<div>
				<h2>{p.title}</h2>
				{@html p.description}
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
	}

	.map {
		position: absolute;
		top: 0;
		bottom: 0;
	}

	.narrative {
		pointer-events: none;
		position: relative;
		margin-top: -50vh;
	}

	.big {
		/* container breakout */
		width: 100vw;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
	}

	.step {
		height: 100vh;
		padding-top: 35vh;
		pointer-events: none;
	}

	.step:first-of-type {
		padding-top: 0;
	}

	.step div {
		background: rgba(0, 0, 0, 0.75);
		margin: 0 auto;
		max-width: 50ch;
		padding: 1em;
		pointer-events: all;
	}

	.step div :global(*) {
		color: white;
		margin-bottom: 1em;
	}

	:global(.step.left) div {
		margin-left: 2em;
	}

	:global(.step.right) div {
		margin-right: 2em;
	}
</style>

#!/usr/bin/env node
import fetch from "node-fetch";
import { marked } from "marked";

const { FELT_ACCESS_TOKEN } = process.env;
const MAP_ID = process.argv[2];

const ENDPOINT = `https://felt.com/api/v1/maps/${MAP_ID}/elements`;

console.error(`Fetching map elements: https://felt.com/map/${MAP_ID}`);

const FIELDS = ["zoom", "pitch", "bearing", "order", "position", "padding"];

marked.use({
	headerIds: false,
	mangle: false,
});

async function main() {
	const resp = await fetch(ENDPOINT, {
		headers: {
			authorization: `Bearer ${FELT_ACCESS_TOKEN}`,
		},
	});

	if (!resp.ok) {
		throw new Error(`Problem loading map: ${resp.statusText}`);
	}

	const { data } = await resp.json();

	const fc = {
		type: data.type,
		features: data.features
			.map(clean)
			.filter(Boolean)
			.sort((a, b) => a.properties.order - b.properties.order),
	};

	// set position after ordering
	fc.features.forEach((f, i) => {
		if (i === 0) {
			f.properties.position = "center";
		} else {
			f.properties.position = i % 2 ? "left" : "right";
		}
	});

	process.stdout.write(JSON.stringify(fc, null, 2));
}

function clean(feature, id) {
	const { properties: p, geometry, type } = feature;

	const properties = {
		title: p["felt-text"],
		description: p["felt-description"] ? marked(p["felt-description"]) : null,
	};

	FIELDS.forEach((f) => {
		if (p[f]) {
			properties[f] = p[f];
		}
	});

	if (properties.order === undefined) {
		properties.order = 0;
	}

	if (properties.title || properties.description) {
		return { id, type, geometry, properties };
	}
}

main().catch(console.error);

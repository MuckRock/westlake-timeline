import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command, ssrBuild }) => {
	/** @type {import('vite').UserConfig} */
	const config = {
		base: process.env.GITHUB_ACTIONS ? "/westlake-timeline/" : "/",
		plugins: [svelte()],
		build: {
			emptyOutDir: false,
			rollupOptions: {
				output: {
					// no hashes
					entryFileNames: "assets/[name].js",
					chunkFileNames: "assets/[name].js",
					assetFileNames: "assets/[name].[ext]",
				},
			},
		},
	};

	if (process.env.MODE !== "demo") {
		config.build.lib = {
			name: "app",
			entry: "src/main.js",
			output: {},
		};
	}

	return config;
});

import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/westlake-timeline/",
	plugins: [svelte()],
	build: {
		rollupOptions: {
			output: {
				// no hashes
				entryFileNames: "assets/[name].js",
				chunkFileNames: "assets/[name].js",
				assetFileNames: "assets/[name].[ext]",
			},
		},

		lib: {
			name: "app",
			entry: "src/main.js",
			output: {},
		},
	},
});

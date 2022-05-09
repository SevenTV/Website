import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";

import { dependencies } from "./package.json";
function renderChunks(deps: Record<string, string>) {
	let chunks = {};
	Object.keys(deps).forEach((key) => {
		chunks[key] = [key];
	});
	return chunks;
}

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		build: {
			sourcemap: false,
			target: "es2021",
			rollupOptions: {
				plugins: [visualizer()],
				output: {
					manualChunks: {
						vendor: ["vue", "vue-router", "vue-i18n", "vue-cookie-next"],
						gql: ["subscriptions-transport-ws", "graphql"],
						apollo: ["apollo-link-context", "@vue/apollo-composable"],
						fa: [
							"@fortawesome/fontawesome-svg-core",
							"@fortawesome/free-brands-svg-icons",
							"@fortawesome/free-regular-svg-icons",
							"@fortawesome/free-solid-svg-icons",
							"@fortawesome/vue-fontawesome",
						],
					},
				},
			},
		},
		plugins: [vue()],
		server: {
			port: 4200,
		},
		resolve: {
			alias: {
				"@": resolve(__dirname, "src"),
				"@store": resolve(__dirname, "src/store"),
				"@scss": resolve(__dirname, "src/assets/scss"),
				"@gql": resolve(__dirname, "src/assets/gql"),
				"@components": resolve(__dirname, "src/components"),
				"@base": resolve(__dirname, "src/components/base"),
				"@utility": resolve(__dirname, "src/components/utility"),
				"@directives": resolve(__dirname, "src/directives"),
				"@structures": resolve(__dirname, "src/structures"),
				"@views": resolve(__dirname, "src/views"),
			},
		},
	});
};

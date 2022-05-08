import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		build: {
			target: "es2021",
			rollupOptions: {
				plugins: [visualizer()],
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

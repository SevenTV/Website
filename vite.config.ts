import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		build: {
			target: ["es2020"],
		},
		plugins: [vue()],
		server: {
			port: 4200,
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
				"@scss": path.resolve(__dirname, "./src/assets/scss"),
				"@gql": path.resolve(__dirname, "./src/assets/gql"),
				"@components": path.resolve(__dirname, "./src/components"),
				"@base": path.resolve(__dirname, "./src/components/base"),
				"@utility": path.resolve(__dirname, "./src/components/utility"),
				"@directives": path.resolve(__dirname, "./src/directives"),
				"@structures": path.resolve(__dirname, "./src/structures"),
			},
		},
	});
};

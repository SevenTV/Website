import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		build: {
			target: ["es2021"],
			rollupOptions: {
				plugins: [visualizer()],
				output: {
					manualChunks: {
						main: [
							"./src/views/Home.vue",
							"./src/views/About.vue",
							"./src/views/OAuth2.vue",
							"./src/views/404.vue",
						],
						emotelist: ["./src/views/EmoteList/EmoteList.vue"],
						emote: [
							"./src/views/EmotePage/EmotePage.vue",
							"./src/views/EmotePage/EmoteInteractions.vue",
							"./src/views/EmotePage/EmoteVersion.vue",
							"./src/views/EmotePage/EmoteComment.vue",
							"./src/views/EmoteUpload/EmoteUpload.vue",
						],
						user: ["./src/views/UserPage/UserPage.vue"],
						store: ["./src/views/Subscribe.vue"],
						admin: [
							"./src/views/Admin/Admin.vue",
							"./src/views/Admin/AdminReports.vue",
							"./src/views/Admin/AdminReportEditor.vue",
							"./src/views/Admin/AdminUsers.vue",
							"./src/views/Admin/AdminRoles.vue",
							"./src/views/Admin/AdminRoleEditor.vue",
							"./src/views/Admin/AdminCosmetics.vue",
							"./src/views/Admin/AdminModQueue.vue",
							"./src/views/Admin/AdminBans.vue",
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

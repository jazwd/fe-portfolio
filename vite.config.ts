import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const awsApiUrl = env.AWS_API_URL ?? env.VITE_AWS_API_URL;
	const awsApiKey = env.AWS_API_KEY ?? env.VITE_AWS_API_KEY;

	return {
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
				"@features": fileURLToPath(new URL("./src/features", import.meta.url)),
			},
		},
		server: {
			port: 3000,
			proxy:
				awsApiUrl && awsApiKey
					? {
							"/api/aws/projects": {
								target: awsApiUrl,
								changeOrigin: true,
								rewrite: () => "",
								headers: {
									"x-api-key": awsApiKey,
								},
							},
						}
					: undefined,
		},
	};
});

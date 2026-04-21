# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Portfolio Data Sources

Use `VITE_PORTFOLIO_SOURCE` to choose how projects are fetched:

- `api`: existing auth + backend `/api/portfolio` flow
- `aws`: direct request to the AWS API endpoint with `x-api-key`
- `fallback`: tries `api` first, then `aws` if the API request fails

AWS variables:

- `VITE_AWS_API_PROXY_PATH` (default: `/api/aws/projects` for local dev)

Server-side AWS variables (Vercel Project Settings -> Environment Variables):

- `AWS_API_URL`
- `AWS_API_KEY`

The app normalizes both response formats to a single `PortfolioResponse` shape used by the UI.

Development CORS note:

- In `npm run dev`, AWS requests are proxied through Vite (`/api/aws/projects`) to avoid browser CORS errors.
- If you change env vars, restart the dev server.

Production CORS note (josezamora-portfolio.vercel.app):

- The frontend calls `/api/aws/projects` on the same domain.
- `api/aws/projects.ts` runs server-side on Vercel and forwards the request to AWS with `x-api-key`.
- Because the browser no longer calls the AWS domain directly, CORS is avoided.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			// Other configs...

			// Remove tseslint.configs.recommended and replace with this
			tseslint.configs.recommendedTypeChecked,
			// Alternatively, use this for stricter rules
			tseslint.configs.strictTypeChecked,
			// Optionally, add this for stylistic rules
			tseslint.configs.stylisticTypeChecked,

			// Other configs...
		],
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.node.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname,
			},
			// other options...
		},
	},
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			// Other configs...
			// Enable lint rules for React
			reactX.configs["recommended-typescript"],
			// Enable lint rules for React DOM
			reactDom.configs.recommended,
		],
		languageOptions: {
			parserOptions: {
				project: ["./tsconfig.node.json", "./tsconfig.app.json"],
				tsconfigRootDir: import.meta.dirname,
			},
			// other options...
		},
	},
]);
```

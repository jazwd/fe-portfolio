/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string;
	readonly VITE_API_USERNAME: string;
	readonly VITE_API_PASSWORD: string;
	readonly VITE_API_TOKEN_TTL_MS: string;
	readonly VITE_PORTFOLIO_CACHE_TIME_MS: string;
	readonly VITE_PORTFOLIO_SOURCE?: "api" | "aws" | "fallback";
	readonly VITE_AWS_API_URL?: string;
	readonly VITE_AWS_API_KEY?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

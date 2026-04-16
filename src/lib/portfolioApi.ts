const TOKEN_STORAGE_KEY = "portfolio_api_bearer_token";
const TOKEN_EXPIRY_STORAGE_KEY = "portfolio_api_bearer_token_expiry";

export type PortfolioProjectImage = {
	title: string;
	path: string;
};

export type PortfolioProject = {
	id: string;
	name: string;
	year: string;
	company: string;
	description: Record<string, string>;
	technologyTags: string[];
	link: {
		label: string;
		url: string;
	};
	images: PortfolioProjectImage[];
};

export type PortfolioResponse = {
	message: string;
	count: number;
	data: PortfolioProject[];
};

type RawPortfolioProject = {
	_id: string;
	name: string;
	year: string;
	company: string;
	description: Record<string, string>;
	"technology-tags": string[];
	link: {
		label: string;
		url: string;
	};
	images: PortfolioProjectImage[];
};

type RawPortfolioResponse = {
	message: string;
	count: number;
	data: RawPortfolioProject[];
};

type TokenResponse = {
	token?: string;
	accessToken?: string;
	bearerToken?: string;
};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const getRequiredEnv = (name: string, value: string | undefined) => {
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}

	return value;
};

const getTokenTtlMs = (value: string) => {
	const parsed = Number(value);
	if (!Number.isFinite(parsed) || parsed <= 0) {
		throw new Error(
			"Invalid VITE_API_TOKEN_TTL_MS value. It must be a positive number in milliseconds.",
		);
	}

	return parsed;
};

const getApiConfig = () => {
	const baseUrl = trimTrailingSlash(
		getRequiredEnv("VITE_API_BASE_URL", import.meta.env.VITE_API_BASE_URL),
	);

	return {
		baseUrl,
		username: getRequiredEnv(
			"VITE_API_USERNAME",
			import.meta.env.VITE_API_USERNAME,
		),
		password: getRequiredEnv(
			"VITE_API_PASSWORD",
			import.meta.env.VITE_API_PASSWORD,
		),
		tokenTtlMs: getTokenTtlMs(
			getRequiredEnv(
				"VITE_API_TOKEN_TTL_MS",
				import.meta.env.VITE_API_TOKEN_TTL_MS,
			),
		),
	};
};

const buildEndpoint = (baseUrl: string, pathAfterApi: string) => {
	if (baseUrl.endsWith("/api")) {
		return `${baseUrl}/${pathAfterApi}`;
	}

	return `${baseUrl}/api/${pathAfterApi}`;
};

const getStoredToken = () => {
	const token = localStorage.getItem(TOKEN_STORAGE_KEY);
	const expiry = localStorage.getItem(TOKEN_EXPIRY_STORAGE_KEY);

	if (!token || !expiry) {
		return null;
	}

	const expiresAt = Number(expiry);
	if (Number.isNaN(expiresAt) || Date.now() >= expiresAt) {
		localStorage.removeItem(TOKEN_STORAGE_KEY);
		localStorage.removeItem(TOKEN_EXPIRY_STORAGE_KEY);
		return null;
	}

	return token;
};

const storeToken = (token: string, tokenTtlMs: number) => {
	localStorage.setItem(TOKEN_STORAGE_KEY, token);
	localStorage.setItem(
		TOKEN_EXPIRY_STORAGE_KEY,
		String(Date.now() + tokenTtlMs),
	);
};

const extractToken = (payload: TokenResponse) => {
	return payload.accessToken ?? payload.token ?? payload.bearerToken ?? null;
};

const mapPortfolioProject = (
	project: RawPortfolioProject,
): PortfolioProject => {
	return {
		id: project._id,
		name: project.name,
		year: project.year,
		company: project.company,
		description: project.description,
		technologyTags: project["technology-tags"],
		link: project.link,
		images: project.images,
	};
};

const mapPortfolioResponse = (
	payload: RawPortfolioResponse,
): PortfolioResponse => {
	return {
		message: payload.message,
		count: payload.count,
		data: payload.data.map(mapPortfolioProject),
	};
};

const loginAndGetToken = async () => {
	const { baseUrl, username, password, tokenTtlMs } = getApiConfig();

	const response = await fetch(buildEndpoint(baseUrl, "auth/login"), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	});

	if (!response.ok) {
		throw new Error(`Login request failed with status ${response.status}`);
	}

	const payload = (await response.json()) as TokenResponse;
	const token = extractToken(payload);

	if (!token) {
		throw new Error("Login succeeded but no token was found in the response");
	}

	storeToken(token, tokenTtlMs);
	return token;
};

const getValidToken = async () => {
	const cachedToken = getStoredToken();
	if (cachedToken) {
		return cachedToken;
	}

	return loginAndGetToken();
};

const requestPortfolio = async (token: string) => {
	const { baseUrl } = getApiConfig();

	const response = await fetch(buildEndpoint(baseUrl, "portfolio"), {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
};

export const fetchPortfolioInformation = async () => {
	let token = await getValidToken();
	let response = await requestPortfolio(token);

	// If backend expires token earlier than expected, refresh once and retry.
	if (response.status === 401) {
		token = await loginAndGetToken();
		response = await requestPortfolio(token);
	}

	if (!response.ok) {
		throw new Error(`Portfolio request failed with status ${response.status}`);
	}

	const payload = (await response.json()) as RawPortfolioResponse;
	return mapPortfolioResponse(payload);
};

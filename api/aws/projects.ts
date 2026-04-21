export default async function handler(req: any, res: any) {
	if (req.method !== "GET") {
		res.status(405).json({ message: "Method Not Allowed" });
		return;
	}

	const awsApiUrl = process.env.AWS_API_URL;
	const awsApiKey = process.env.AWS_API_KEY;

	if (!awsApiUrl || !awsApiKey) {
		res.status(500).json({
			message: "Missing server environment variables: AWS_API_URL/AWS_API_KEY",
		});
		return;
	}

	try {
		const upstreamResponse = await fetch(awsApiUrl, {
			headers: {
				"x-api-key": awsApiKey,
			},
		});

		const text = await upstreamResponse.text();
		let payload: unknown = text;

		try {
			payload = JSON.parse(text);
		} catch {
			// Keep text payload as-is if upstream does not return JSON.
		}

		res.status(upstreamResponse.status).json(payload);
	} catch {
		res.status(502).json({ message: "Failed to fetch AWS projects endpoint" });
	}
}

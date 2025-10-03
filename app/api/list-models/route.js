export async function GET() {
	try {
		const apiKey = process.env.GOOGLE_API_KEY;
		if (!apiKey) {
			return new Response(
				JSON.stringify({ error: "GOOGLE_API_KEY is missing in environment." }),
				{ status: 500, headers: { "Content-Type": "application/json" } }
			);
		}
		const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
		const res = await fetch(url);
		if (!res.ok) {
			const err = await res.text();
			return new Response(
				JSON.stringify({ error: `Failed to fetch models: ${err}` }),
				{ status: res.status, headers: { "Content-Type": "application/json" } }
			);
		}
		const data = await res.json();
		return new Response(JSON.stringify(data), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({ error: error.message || "Failed to list models" }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}

import { getFirstRespondingDB } from './database.mjs';

function isValidUrl(url) {
	const urlPattern = new RegExp(
		'^(https?:\\/\\/)?' + // optional protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', 'i' // fragment locator
	);
	return urlPattern.test(url);
}

const responseOptions = {
	"headers": {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "POST",
		"Edge-Region": process.env.VERCEL_REGION
	}
}

export async function POST(req) {
	const url = await req.text();

	if (!url) {
		return new Response("Invalid request", { ...responseOptions, status: 400 });
	}

	if (!isValidUrl(url)) {
		return new Response("Invalid url", { ...responseOptions, status: 400 });
	}

	try {
		const region = await getFirstRespondingDB();
		const link = region.url + "/rest/v1/nodejs-urls";
		const apikey = region.anon;

		const response = await fetch(link, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"apikey": apikey,
				"Prefer": "return=representation"
			},
			body: JSON.stringify({ url })
		});

		const key = (await response.json())[0].key;

		return new Response(region.code + key, responseOptions);

	} catch (error) {
		console.error('Failed to fetch data:', error);
		throw error;
	}
}

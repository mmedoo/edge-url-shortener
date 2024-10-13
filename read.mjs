import { RegionsCodes } from "./regions.mjs";

export async function GET(request) {
	const requestUrl = new URL(request.url);
	var key = requestUrl.pathname.split("/")[1];
	
	if (!key || key === '') {
		return new Response('Invalid key', { status: 400 });
	}

	if (key.length < 4) {
		return new Response('Invalid key length', { status: 400 });
	}

	if (!RegionsCodes[key[0]]) {
		return new Response('Invalid region code', { status: 400 });
	}

	const db = RegionsCodes[key[0]];
	key = key.slice(1);
	
	const {url, anon} = db;

	const prms = new URLSearchParams({
		key: "eq." + key,
		select: "url",
		apikey: anon
	});
	
	try {
		const response = await fetch(url + "/rest/v1/nodejs-urls?" + prms);
		const url_queried = await response.json();
		return Response.redirect(url_queried[0].url, 302);
	} catch (error) {
		console.error('Failed to fetch data:', error);
		return new Response("Key not found", { status: 404 });
	}
}
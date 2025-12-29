import { Regions } from "./regions.mjs";

const dbRegions = Object.values(Regions);

async function getFirstRespondingDB() {

	// Create an AbortController for each request
	const controllers = dbRegions.map(() => new AbortController());

	try {
		// Use Promise.any to wait for the first successful (2xx) response
		const firstRespondingIndex = await Promise.any(
			dbRegions.map((region, index) =>
				(async () => {
					try {
						const response = await fetch(region.url + "/rest-admin/v1/ready", {
							method: 'HEAD',
							headers: { 'apikey': region.anon },
							signal: controllers[index].signal
						});
						
						if (response.ok)
							return index; // resolve only on positive status

						// Reject so Promise.any keeps waiting for a successful one
						throw new Error(`Non-OK response: ${response.status}`);
						
					} catch (error) {
						// propagate AbortError and other errors so this promise rejects
						throw error;
					}
				})()
			)
		);

		// Abort all remaining requests
		controllers.forEach((controller, index) => {
			if (index !== firstRespondingIndex) {
				controller.abort();
			}
		});

		// Return the first responding region's URL and key
		return dbRegions[firstRespondingIndex];
	} catch (error) {
		console.error('Error while connecting to databases:', error);
		throw error;
	}
}

export { getFirstRespondingDB };
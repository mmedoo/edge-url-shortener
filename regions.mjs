const Regions = {
	Frankfurt: {
		url: process.env.FRANKFURT_DB_URL,
		anon: process.env.FRANKFURT_DB_ANON_KEY,
		code: 'f'
	},
	Brazil: {
		url: process.env.BRAZIL_DB_URL,
		anon: process.env.BRAZIL_DB_ANON_KEY,
		code: 'b'
	},
	India: {
		url: process.env.INDIA_DB_URL,
		anon: process.env.INDIA_DB_ANON_KEY,
		code: 'i'
	},
	USA: {
		url: process.env.USA_DB_URL,
		anon: process.env.USA_DB_ANON_KEY,
		code: 'u'
	},
	AUS: {
		url: process.env.AUS_DB_URL,
		anon: process.env.AUS_DB_ANON_KEY,
		code: 'a'
	},
	STK: {
		url: process.env.STK_DB_URL,
		anon: process.env.STK_DB_ANON_KEY,
		code: 's'
	}
}

const RegionsCodes = {
	'f': Regions.Frankfurt,
	'b': Regions.Brazil,
	'i': Regions.India,
	'u': Regions.USA,
	'a': Regions.AUS,
	's': Regions.STK
}

export { Regions, RegionsCodes };
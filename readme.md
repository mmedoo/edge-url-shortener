# Introduction
Available at: https://mmedoo.github.io/url

URL shortening using Edge Functions. More about edge functions here: https://en.wikipedia.org/wiki/Edge_computing

# Features

- **API on the edge** offers rapid response.
- **Sharded Database** into 6 around the globe.
	- **Locations** (URL key prefix):
		1. **Frankfurt** (f)
		2. **Brazil** (b)
		3. **India** (i)
		4. **South** Korea (s)
		5. **Australia** (a)
		6. **USA** (u)
	- Write requests are forwarded to first responding DB (Least Latency).
	- No Replications.

- **Hash Indexing** by PostgreSQL is used to achieve constant time exact matching reads.

- **In-memory Caching** on the edge is under development.

- **Shorter Domain Name** is needed to achieve value.

### Write Request Flow
- The Edge Function makes a `HEAD` request to all 6 DBs. The first responding DB is used to store the URL and generate the corresponding key whose column is hash indexed for constant time exact matching reads.

- The DB returns the generated key to the function where the DB identifier is added as prefix to the key. The Edge function responds to the user with the key prefixed with the DB identifier.

- **Full Key example**:

		bHXat
	- **DB Identifier**: `b` corresponds to the DB located in brazil.
	- **URL Key**: `HXat` the key in the DB corresponds to the URL.

- This flow assures the quickest response possible with edge function and writes based on least latency between user's edge and the DB.


### Read Request Flow

- The Edge Function takes a key from the user, which starts with a DB identifier, makes a query to the corresponding DB to retrieve the URL corresponding to that key, redirects the user to the URL.

# Live at
https://mmedoo.github.io/url

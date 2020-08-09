var PRNG_VARS = {};
PRNG_VARS["x"] = 2348057239;

function prng(rngType, range, seed) {
	PRNG_VARS["a"] = range;
	if(seed != undefined && seed != null) {
		PRNG_VARS["x"] = seed;
	}
	switch(rngType) {
		case "modular":

			PRNG_VARS["x"] = (7901 * PRNG_VARS.x + 9467)%(177013);

			return PRNG_VARS.x % PRNG_VARS.a;
	}
}
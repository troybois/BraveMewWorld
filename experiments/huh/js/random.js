var PRNG_VARS = {};
PRNG_VARS["x"] = 2348057239;

function prng(rngType, range, params) {
	PRNG_VARS["a"] = range;
	switch(rngType) {
		case "modular":
			PRNG_VARS["x"] = (1102 * PRNG_VARS.x + 1101)%(1100);
			return PRNG_VARS.x % PRNG_VARS.a;
	}
}
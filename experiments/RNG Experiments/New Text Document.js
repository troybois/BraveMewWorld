var PRNG_VARS = {};
PRNG_VARS["x"]=2348057239;
function prng(rngType, range, params) 
{
PRNG_VARS["a"] = range;
switch(rngType) {
    case "NAME":
      PRNG_VARS["b"] = (1101 * PRNG_VARS.x + 1102)%(1100);
      return PRNG_VARS.b % PRNG_VARS.a;
      break;
  }
}
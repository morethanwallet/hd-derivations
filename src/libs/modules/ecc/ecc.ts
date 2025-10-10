import { ECPairFactory, type ECPairAPI } from "ecpair";
import * as ecc from "tiny-secp256k1";
import { initEccLib } from "bitcoinjs-lib";

const ecPair: ECPairAPI = ECPairFactory(ecc);
initEccLib(ecc);

export { ecPair, ecc };
export type { ECPairInterface } from "./libs/types/types.js";

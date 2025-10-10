import { ECPairFactory, type ECPairAPI, type ECPairInterface } from "ecpair";
import * as ecc from "tiny-secp256k1";
import { initEccLib } from "bitcoinjs-lib";

const ecPair: ECPairAPI = ECPairFactory(ecc);
initEccLib(ecc);

export { ecPair, type ECPairInterface, ecc };

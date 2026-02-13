import { type PrefixConfig } from "@/libs/modules/curves/curves.js";
import { ecPair, type ECPairInterface } from "@/libs/modules/ecc/ecc.js";
import { convertBytesToHex } from "@/libs/utils/utils.js";

function getKeyPairFromWif(wif: string, prefixConfig: PrefixConfig) {
  const keyPair: ECPairInterface = ecPair.fromWIF(wif, prefixConfig);
  const publicKey = convertBytesToHex(keyPair.publicKey);

  return { privateKey: wif, publicKey };
}

export { getKeyPairFromWif };

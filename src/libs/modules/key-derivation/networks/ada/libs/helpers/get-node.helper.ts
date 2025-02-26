import { DerivationPathSymbol } from "@/libs/enums/index.js";
import {
  checkHardenedSuffixEnding,
  getDerivationPathSegmentsArray,
  hardenDerivationPathValue,
} from "@/libs/helpers/index.js";
import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

function getNode(rootKey: Bip32PrivateKey, derivationPath: string): Bip32PrivateKey {
  const pathSegmentsArray = getDerivationPathSegmentsArray(derivationPath);

  let node = rootKey;

  for (const segment of pathSegmentsArray) {
    if (segment === DerivationPathSymbol.MASTER_KEY) continue;

    const isHardened = checkHardenedSuffixEnding(segment);

    const formattedSegment = isHardened
      ? hardenDerivationPathValue(Number.parseInt(segment))
      : Number(segment);

    node = node.derive(formattedSegment);
  }

  return node;
}

export { getNode };

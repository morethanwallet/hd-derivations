import { DerivationPathSymbol, SplittedDerivationPathItemIndex } from "@/libs/enums/index.js";
import {
  checkHardenedSuffixEnding,
  getDerivationPathSegmentsArray,
  hardenDerivationPathValue,
} from "@/libs/helpers/index.js";
import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

function getAccount(rootKey: Bip32PrivateKey, derivationPath: string): Bip32PrivateKey {
  const pathSegmentsArray = getDerivationPathSegmentsArray(derivationPath).slice(
    SplittedDerivationPathItemIndex.PURPOSE_START,
    SplittedDerivationPathItemIndex.ACCOUNT_END
  );

  let account = rootKey;

  for (const segment of pathSegmentsArray) {
    if (segment === DerivationPathSymbol.MASTER_KEY) continue;

    const isHardened = checkHardenedSuffixEnding(segment);

    const formattedSegment = hardenDerivationPathValue(
      isHardened ? segment.replace(DerivationPathSymbol.HARDENED_SUFFIX, "") : segment
    );

    account = account.derive(formattedSegment);
  }

  return account;
}

export { getAccount };

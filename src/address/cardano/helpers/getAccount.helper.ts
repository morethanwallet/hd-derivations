import { HARDENED_SUFFIX, MASTER_KEY_SYMBOL } from "@/constants/index.js";
import {
  checkIfSegmentHardened,
  getDerivationPathSegmentsArray,
  hardenDerivationPathValue,
} from "@/helpers/index.js";
import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-nodejs";

const PURPOSE_START_INDEX = 1;
const ACCOUNT_END_INDEX = 4;

function getAccount(rootKey: Bip32PrivateKey, derivationPath: string): Bip32PrivateKey {
  const pathSegmentsArray = getDerivationPathSegmentsArray(derivationPath).slice(
    PURPOSE_START_INDEX,
    ACCOUNT_END_INDEX
  );

  let account = rootKey;

  for (const segment of pathSegmentsArray) {
    if (segment === MASTER_KEY_SYMBOL) continue;

    const isHardened = checkIfSegmentHardened(segment);

    const formattedSegment = hardenDerivationPathValue(
      isHardened ? segment.replace(HARDENED_SUFFIX, "") : segment
    );

    account = account.derive(formattedSegment);
  }

  return account;
}

export { getAccount };

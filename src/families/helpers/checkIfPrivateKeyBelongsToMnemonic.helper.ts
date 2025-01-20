import { DERIVATION_PATH_DELIMITER, HARDENED_SUFFIX } from "@/constants/index.js";
import { type DerivationPath } from "@/types/derivation/index.js";
import {
  type DeriveItemsBatchFromMnemonicInnerHandler,
  type CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters,
} from "../types/index.js";
import { type DerivationTypeUnion } from "@/types/index.js";
import { MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY } from "../constants/index.js";
import { checkHardenedSuffixEnding } from "@/helpers/index.js";
import { SplittedDerivationPathItemIndex } from "@/enums/index.js";

const SEGMENT_INITIAL_VALUE = "0";

function getDerivationPathPrefix(
  derivationPath: DerivationPath["derivationPath"]
): DerivationPath["derivationPath"] {
  return derivationPath
    .split(DERIVATION_PATH_DELIMITER)
    .slice(SplittedDerivationPathItemIndex.MASTER_START, SplittedDerivationPathItemIndex.COIN_END)
    .join(DERIVATION_PATH_DELIMITER);
}

function hardenDerivationPath(
  derivationPath: DerivationPath["derivationPath"]
): DerivationPath["derivationPath"] {
  return derivationPath.concat(HARDENED_SUFFIX);
}

function increaseDerivationPathDepth(
  derivationPath: DerivationPath["derivationPath"]
): DerivationPath["derivationPath"] {
  return `${derivationPath}${DERIVATION_PATH_DELIMITER}${SEGMENT_INITIAL_VALUE}`;
}

function checkIfPrivateKeyBelongsToMnemonic<T extends DerivationTypeUnion>(
  this: { deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonicInnerHandler<T> },
  derivationPathPrefixToCompare: DerivationPath["derivationPath"],
  parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<T>
): boolean {
  const derivationPathPrefix = getDerivationPathPrefix(parameters.derivationPathPrefix);

  if (derivationPathPrefix !== derivationPathPrefixToCompare) {
    return false;
  }

  let updatedDerivationPath = parameters.derivationPathPrefix;
  let derivationPathDepth = updatedDerivationPath.split(DERIVATION_PATH_DELIMITER).length;

  do {
    const itemsBatch = this.deriveItemsBatchFromMnemonic({
      ...parameters,
      derivationPathPrefix: updatedDerivationPath,
    });

    if (
      itemsBatch.some((item) => {
        if ("privateKey" in item && item.privateKey === parameters.privateKey) return true;
        if (
          "rewardPrivateKey" in item &&
          "enterprisePrivateKey" in item &&
          (item.rewardPrivateKey === parameters.privateKey ||
            item.enterprisePrivateKey === parameters.privateKey)
        )
          return true;
      })
    ) {
      return true;
    }

    if (!checkHardenedSuffixEnding(updatedDerivationPath)) {
      updatedDerivationPath = hardenDerivationPath(updatedDerivationPath);
    } else {
      updatedDerivationPath = increaseDerivationPathDepth(updatedDerivationPath);
      derivationPathDepth++;
    }
  } while (derivationPathDepth <= MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY);

  return false;
}

export { checkIfPrivateKeyBelongsToMnemonic };

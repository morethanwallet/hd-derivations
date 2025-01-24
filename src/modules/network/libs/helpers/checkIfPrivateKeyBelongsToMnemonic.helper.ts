import type {
  DerivationPath,
  DerivationTypeUnion,
  SignatureSchemeUnion,
} from "@/libs/types/index.js";
import {
  type DeriveItemsBatchFromMnemonicInnerHandler,
  type CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters,
} from "../types/index.js";
import { MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY } from "../../constants/index.js";
import { checkHardenedSuffixEnding } from "@/libs/helpers/index.js";
import { DerivationPathSymbol, SplittedDerivationPathItemIndex } from "@/libs/enums/index.js";

const SEGMENT_INITIAL_VALUE = "0";

type IncreaseDerivationPathDepthParameters = {
  derivationPath: DerivationPath["derivationPath"];
  scheme?: SignatureSchemeUnion;
};

function getDerivationPathPrefix(
  derivationPath: DerivationPath["derivationPath"]
): DerivationPath["derivationPath"] {
  return derivationPath
    .split(DerivationPathSymbol.DELIMITER)
    .slice(SplittedDerivationPathItemIndex.MASTER_START, SplittedDerivationPathItemIndex.COIN_END)
    .join(DerivationPathSymbol.DELIMITER);
}

function hardenDerivationPath(
  derivationPath: DerivationPath["derivationPath"]
): DerivationPath["derivationPath"] {
  return derivationPath.concat(DerivationPathSymbol.HARDENED_SUFFIX);
}

function increaseDerivationPathDepth({
  derivationPath,
  scheme = "secp256k1",
}: IncreaseDerivationPathDepthParameters): DerivationPath["derivationPath"] {
  const hardenedSuffix = scheme === "ed25519" ? DerivationPathSymbol.HARDENED_SUFFIX : "";
  return `${derivationPath}${DerivationPathSymbol.DELIMITER}${SEGMENT_INITIAL_VALUE}${hardenedSuffix}`;
}

function checkIfPrivateKeyBelongsToMnemonic<T extends DerivationTypeUnion>(
  this: { deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonicInnerHandler<T> },
  parameters: CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters<T>,
  derivationPathPrefixToCompare: DerivationPath["derivationPath"],
  scheme?: SignatureSchemeUnion
): boolean {
  const derivationPathPrefix = getDerivationPathPrefix(parameters.derivationPathPrefix);

  if (derivationPathPrefix !== derivationPathPrefixToCompare) {
    return false;
  }

  let updatedDerivationPath = parameters.derivationPathPrefix;
  let derivationPathDepth = updatedDerivationPath.split(DerivationPathSymbol.DELIMITER).length;

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
      updatedDerivationPath = increaseDerivationPathDepth({
        scheme,
        derivationPath: updatedDerivationPath,
      });
      derivationPathDepth++;
    }
  } while (derivationPathDepth <= MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY);

  return false;
}

export { checkIfPrivateKeyBelongsToMnemonic };

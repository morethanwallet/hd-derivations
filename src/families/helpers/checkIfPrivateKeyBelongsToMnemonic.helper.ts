import { DERIVATION_PATH_DELIMITER } from "@/constants/index.js";
import { type DerivationPath } from "@/types/derivation/index.js";
import {
  type DeriveItemsBatchFromMnemonicInnerHandler,
  type CheckIfPrivateKeyBelongsToMnemonicInnerHandlerParameters,
} from "../types/index.js";
import { type DerivationTypeUnion } from "@/types/index.js";
import { increaseDerivationPathDepth } from "./increaseDerivationPathDepth.helper.js";
import { getDerivationPathPrefix } from "./getDerivationPathPrefix.helper.js";
import { MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY } from "../constants/index.js";

function checkIfPrivateKeyBelongsToMnemonic<T extends Exclude<DerivationTypeUnion, "adaBase">>(
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
      derivationPath: updatedDerivationPath,
    });

    if (itemsBatch.some((item) => item.privateKey === parameters.privateKey)) {
      return true;
    }

    updatedDerivationPath = increaseDerivationPathDepth(updatedDerivationPath);
    derivationPathDepth++;
  } while (derivationPathDepth <= MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY);

  return false;
}

export { checkIfPrivateKeyBelongsToMnemonic };

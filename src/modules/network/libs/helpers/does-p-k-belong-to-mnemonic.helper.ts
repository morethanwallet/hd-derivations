import type {
  AptDerivationTypeUnion,
  GetDerivationTypeUnion,
  DerivationTypeUnion,
} from "@/libs/types/index.js";
import type {
  DeriveItemsBatchFromMnemonic,
  DoesPKBelongToMnemonicParameters,
} from "../types/index.js";
import { checkHardenedSuffixEnding } from "@/libs/helpers/index.js";
import { DerivationPathSymbol } from "@/libs/enums/index.js";
import { doesPKExistInBatch } from "./does-p-k-exist-in-batch.helper.js";
import { MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY } from "../constants/index.js";
import { increaseDerivationPathDepth } from "./increase-derivation-path-depth.helper.js";
import { getDerivationPathDepth } from "./get-derivation-path-depth.helper.js";
import { validateDerivationPath } from "./validate-derivation-path/index.js";

type SupportedDerivationTypes = Exclude<
  DerivationTypeUnion,
  GetDerivationTypeUnion<"suiBase" | "adaBase" | AptDerivationTypeUnion | "dotBase">
>;

function doesPKBelongToMnemonic<T extends SupportedDerivationTypes>(
  this: {
    deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<SupportedDerivationTypes>;
  },
  parameters: DoesPKBelongToMnemonicParameters<T>,
  isStrictHardened?: boolean,
): boolean {
  validateDerivationPath(parameters.derivationPathPrefix, isStrictHardened);
  let updatedDerivationPath = parameters.derivationPathPrefix;
  let derivationPathDepth = getDerivationPathDepth(updatedDerivationPath);

  do {
    const itemsBatch = this.deriveItemsBatchFromMnemonic({
      ...parameters,
      derivationPathPrefix: updatedDerivationPath,
    });

    const { privateKey } = parameters;

    if (doesPKExistInBatch(itemsBatch, privateKey)) return true;

    if (derivationPathDepth < MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY) {
      updatedDerivationPath = increaseDerivationPathDepth({
        shouldHarden: isStrictHardened,
        derivationPath: updatedDerivationPath,
      });

      derivationPathDepth++;
      continue;
    }

    if (derivationPathDepth === MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY) {
      const derivationPathHardenedPart = updatedDerivationPath
        .split(DerivationPathSymbol.DELIMITER)
        .filter(
          (part) =>
            part.includes(DerivationPathSymbol.HARDENED_SUFFIX) ||
            part === DerivationPathSymbol.MASTER_KEY,
        )
        .join(DerivationPathSymbol.DELIMITER);

      updatedDerivationPath = increaseDerivationPathDepth({
        shouldHarden: true,
        derivationPath: derivationPathHardenedPart,
      });

      derivationPathDepth = getDerivationPathDepth(updatedDerivationPath);
    }

    if (
      derivationPathDepth > MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY &&
      checkHardenedSuffixEnding(updatedDerivationPath)
    ) {
      break;
    }
  } while (true);

  return false;
}

export { doesPKBelongToMnemonic };

import type {
  DeriveItemsBatchFromMnemonic,
  DoesPKBelongToMnemonicParameters,
} from "../types/index.js";
import { doesPKExistInBatch } from "./does-p-k-exist-in-batch.helper.js";
import { MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY } from "../constants/index.js";
import { increaseDerivationPathDepth } from "./derivation-path/increase-derivation-path-depth.helper.js";
import { getDerivationPathDepth } from "./derivation-path/get-derivation-path-depth.helper.js";
import { validateDerivationPath } from "./derivation-path/validate-derivation-path/index.js";

import { DerivationPathSymbol } from "@/libs/enums/enums.js";
import { checkHardenedSuffixEnding, getDerivationPathSegments } from "@/libs/helpers/helpers.js";
import type {
  DerivationTypeUnionByNetwork,
  GetDerivationTypeUnion,
  DerivationTypeUnion,
} from "@/libs/types/types.js";

type SupportedDerivationTypes = Exclude<
  DerivationTypeUnion,
  GetDerivationTypeUnion<"suiBase" | "adaBase" | "dotBase"> & DerivationTypeUnionByNetwork["apt"]
>;

async function doesPKBelongToMnemonic<T extends SupportedDerivationTypes>(
  this: {
    deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<SupportedDerivationTypes>;
  },
  parameters: DoesPKBelongToMnemonicParameters<T>,
  isStrictHardened?: boolean,
): Promise<boolean> {
  let updatedDerivationPath = parameters.derivationPathPrefix;
  validateDerivationPath(updatedDerivationPath, isStrictHardened);
  let derivationPathDepth = getDerivationPathDepth(updatedDerivationPath);

  do {
    const itemsBatch = await this.deriveItemsBatchFromMnemonic({
      ...parameters,
      derivationPathPrefix: updatedDerivationPath,
      shouldUseHardenedAddress: isStrictHardened,
    });

    if (!isStrictHardened) {
      const itemsBatch = await this.deriveItemsBatchFromMnemonic({
        ...parameters,
        derivationPathPrefix: updatedDerivationPath,
        shouldUseHardenedAddress: false,
      });

      itemsBatch.push(...itemsBatch);
    }

    if (doesPKExistInBatch(itemsBatch, parameters.privateKey)) {
      return true;
    }

    if (derivationPathDepth < MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY) {
      updatedDerivationPath = increaseDerivationPathDepth({
        shouldHarden: isStrictHardened,
        derivationPath: updatedDerivationPath,
      });

      derivationPathDepth++;
      continue;
    }

    if (derivationPathDepth === MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY) {
      const derivationPathHardenedPart = getDerivationPathSegments(updatedDerivationPath)
        .filter((part) => {
          return (
            part.includes(DerivationPathSymbol.HARDENED_SUFFIX) ||
            part === DerivationPathSymbol.MASTER_KEY
          );
        })
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

import type {
  DerivationPath,
  DerivationTypeMap,
  DerivationTypeUnion,
  SignatureSchemeUnion,
} from "@/libs/types/index.js";
import {
  type DeriveItemsBatchFromMnemonic,
  type DoesPKBelongToMnemonicParameters,
} from "../types/index.js";
import { checkHardenedSuffixEnding } from "@/libs/helpers/index.js";
import { DerivationPathSymbol } from "@/libs/enums/index.js";
import { doesPKExistInBatch } from "./does-p-k-exist-in-batch.helper.js";

const SEGMENT_INITIAL_VALUE = "0";

const MAX_DERIVATION_PATH_DEPTH_TO_CHECK_PRIVATE_KEY = 6;

type IncreaseDerivationPathDepthParameters = {
  derivationPath: DerivationPath["derivationPath"];
  scheme?: SignatureSchemeUnion;
};

function hardenDerivationPath(
  derivationPath: DerivationPath["derivationPath"],
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

type SupportedDerivationTypes = Exclude<DerivationTypeUnion, DerivationTypeMap["suiBase"]>;

function doesPKBelongToMnemonic<T extends SupportedDerivationTypes>(
  this: {
    deriveItemsBatchFromMnemonic: DeriveItemsBatchFromMnemonic<T>;
  },
  parameters: DoesPKBelongToMnemonicParameters<T>,
  scheme?: SignatureSchemeUnion,
): boolean {
  let updatedDerivationPath = parameters.derivationPathPrefix;
  let derivationPathDepth = updatedDerivationPath.split(DerivationPathSymbol.DELIMITER).length;

  do {
    const itemsBatch = this.deriveItemsBatchFromMnemonic({
      ...parameters,
      derivationPathPrefix: updatedDerivationPath,
    });

    const { privateKey } = parameters;

    if (doesPKExistInBatch(itemsBatch, privateKey)) return true;

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

export { doesPKBelongToMnemonic };

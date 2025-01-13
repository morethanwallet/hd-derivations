import { type DerivationType } from "../enums/index.js";
import { type BaseDerivationKeyPair as CardanoBaseDerivationKeyPair } from "@/address/cardano/types/index.js";
import { type DerivationTypeUnion } from "./derivationTypeUnion.type.js";
import { type DerivationKeyPair } from "./derivationKeyPair.type.js";
import { type CommonInconsistentDerivationParameters } from "./commonInconsistentDerivationParameters.type.js";
import { type DerivedCredential } from "./derivedCredential.type.js";

type ImportByPrivateKeyParameters<TDerivationType extends DerivationTypeUnion> = {
  derivationPath: string;
} & (TDerivationType extends typeof DerivationType.ADA_BASE
  ? {
      enterprisePrivateKey: CardanoBaseDerivationKeyPair["enterprisePrivateKey"];
      rewardPrivateKey: CardanoBaseDerivationKeyPair["rewardPrivateKey"];
    }
  : { privateKey: DerivationKeyPair["privateKey"] }) &
  CommonInconsistentDerivationParameters<TDerivationType>;

type ImportByPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: ImportByPrivateKeyParameters<TDerivationType>
) => DerivedCredential<TDerivationType>;

export { type ImportByPrivateKey, type ImportByPrivateKeyParameters };

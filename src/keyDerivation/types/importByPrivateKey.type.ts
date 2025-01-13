// import { type DerivationType } from "../enums/index.js";
// import { type CardanoDerivedBaseKeyPair } from "./cardanoDerivedBaseKeyPair.type.js";
// import { type DerivationTypeUnion } from "./derivationTypeUnion.type.js";
// import { type DerivedKeyPair } from "./derivedKeyPair.type.js";
// import { type CommonInconsistentDerivationParameters } from "./commonInconsistentDerivationParameters.type.js";
// import { type DerivedCredential } from "./derivedCredential.type.js";

type ImportByPrivateKeyParameters<TDerivationType extends DerivationTypeUnion> =
  (TDerivationType extends typeof DerivationType.ADA_BASE
    ? {
        enterprisePrivateKey: CardanoDerivedBaseKeyPair["enterprisePrivateKey"];
        rewardPrivateKey: CardanoDerivedBaseKeyPair["rewardPrivateKey"];
      }
    : { privateKey: DerivedKeyPair["privateKey"] }) &
    CommonInconsistentDerivationParameters<TDerivationType>;

type ImportByPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: ImportByPrivateKeyParameters<TDerivationType>
) => DerivedCredential<TDerivationType>;

// export { type ImportByPrivateKey, type ImportByPrivateKeyParameters };

import { type CardanoBaseKeyPair, type CommonKeyPair, type KeyPair } from "@/types/keys/index.js";
import { type DerivationTypeMap, type DerivationTypeUnion } from "@/types/derivation/index.js";

type ImportByPrivateKeyParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends DerivationTypeMap["adaBase"]
    ? {
        enterprisePrivateKey: CardanoBaseKeyPair["enterprisePrivateKey"];
        rewardPrivateKey: CardanoBaseKeyPair["rewardPrivateKey"];
      }
    : { privateKey: CommonKeyPair["privateKey"] };

type ImportByPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: ImportByPrivateKeyParameters<TDerivationType>
) => KeyPair<TDerivationType>;

export { type ImportByPrivateKey, type ImportByPrivateKeyParameters };

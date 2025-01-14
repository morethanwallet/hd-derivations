import { type CardanoBaseKeyPair, type CommonKeyPair, type KeyPair } from "./keyPair.type.js";
import { type DerivationTypeUnion } from "@/types/index.js";
import { type DerivationType } from "@/enums/index.js";

type ImportByPrivateKeyParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends typeof DerivationType.ADA_BASE
    ? {
        enterprisePrivateKey: CardanoBaseKeyPair["enterprisePrivateKey"];
        rewardPrivateKey: CardanoBaseKeyPair["rewardPrivateKey"];
      }
    : { privateKey: CommonKeyPair["privateKey"] };

type ImportByPrivateKey<TDerivationType extends DerivationTypeUnion> = (
  parameters: ImportByPrivateKeyParameters<TDerivationType>
) => KeyPair<TDerivationType>;

export { type ImportByPrivateKey, type ImportByPrivateKeyParameters };

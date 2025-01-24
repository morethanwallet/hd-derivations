import {
  type AvaxDerivationTypeUnion,
  type AdaDerivationTypeUnion,
  type BtcDerivationTypeUnion,
  type DerivationTypeUnion,
  type DerivationTypeMap,
} from "@/libs/types/index.js";

type DerivationTypeParameter<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends BtcDerivationTypeUnion
    ? { derivationType: BtcDerivationTypeUnion }
    : TDerivationType extends AdaDerivationTypeUnion
      ? { derivationType: AdaDerivationTypeUnion }
      : TDerivationType extends AvaxDerivationTypeUnion
        ? { derivationType: AvaxDerivationTypeUnion }
        : TDerivationType extends DerivationTypeMap["trxBase"]
          ? { derivationType: DerivationTypeMap["trxBase"] }
          : TDerivationType extends DerivationTypeMap["tonBase"]
            ? { derivationType: DerivationTypeMap["tonBase"] }
            : Record<string, unknown>;

export { type DerivationTypeParameter };

import {
  type AvaxDerivationTypeUnion,
  type AdaDerivationTypeUnion,
  type BtcDerivationTypeUnion,
  type DerivationTypeUnion,
  type DerivationTypeMap,
} from "@/libs/types/index.js";

type DerivationTypeParameter<TDerivationType extends DerivationTypeUnion> = {
  derivationType: TDerivationType extends BtcDerivationTypeUnion
    ? BtcDerivationTypeUnion
    : TDerivationType extends AdaDerivationTypeUnion
      ? AdaDerivationTypeUnion
      : TDerivationType extends AvaxDerivationTypeUnion
        ? AvaxDerivationTypeUnion
        : TDerivationType extends DerivationTypeMap["trxBase"]
          ? DerivationTypeMap["trxBase"]
          : TDerivationType extends DerivationTypeMap["tonBase"]
            ? DerivationTypeMap["tonBase"]
            : TDerivationType extends DerivationTypeMap["suiBase"]
              ? DerivationTypeMap["suiBase"]
              : unknown;
};

export { type DerivationTypeParameter };

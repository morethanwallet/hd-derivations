import {
  type AdaDerivationTypeUnion,
  type BtcDerivationTypeUnion,
  type DerivationTypeUnion,
} from "@/types/index.js";

type CommonInconsistentParametersDerivationType<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends BtcDerivationTypeUnion
    ? { derivationType: BtcDerivationTypeUnion }
    : TDerivationType extends AdaDerivationTypeUnion
    ? { derivationType: AdaDerivationTypeUnion }
    : Record<string, unknown>;

export { type CommonInconsistentParametersDerivationType };

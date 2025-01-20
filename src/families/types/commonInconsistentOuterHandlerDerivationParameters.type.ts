import {
  type AvaxDerivationTypeUnion,
  type AdaDerivationTypeUnion,
  type BtcDerivationTypeUnion,
  type DerivationTypeUnion,
  type DerivationTypeMap,
} from "@/types/index.js";

type CommonInconsistentOuterHandlerDerivationParameters<
  TDerivationType extends DerivationTypeUnion
> = TDerivationType extends BtcDerivationTypeUnion
  ? { derivationType: BtcDerivationTypeUnion }
  : TDerivationType extends AdaDerivationTypeUnion
  ? { derivationType: AdaDerivationTypeUnion }
  : TDerivationType extends AvaxDerivationTypeUnion
  ? { derivationType: AvaxDerivationTypeUnion }
  : TDerivationType extends DerivationTypeMap["trxBase"]
  ? { derivationType: DerivationTypeMap["trxBase"] }
  : Record<string, unknown>;

export { type CommonInconsistentOuterHandlerDerivationParameters };

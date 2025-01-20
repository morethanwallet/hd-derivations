import {
  type TaprootKeyDerivation,
  type CommonBipKeyDerivation,
  type EnterpriseKeyDerivation,
  type RewardKeyDerivation,
  type BaseKeyDerivation,
} from "@/keyDerivation/index.js";
import {
  type BtcDerivationTypeUnion,
  type DerivationTypeMap,
  type AvaxDerivationTypeUnion,
  type AdaDerivationTypeUnion,
} from "@/types/index.js";
import { type DerivationTypeUnion } from "@/types/index.js";
import { type CommonNetworkPurposeRegTestExtendedUnion } from "@/types/network/index.js";

type AvaxParameters = {
  isMainnet: boolean;
  derivationType: AvaxDerivationTypeUnion;
  keysDerivationInstance: InstanceType<typeof CommonBipKeyDerivation>;
};

type BtcParameters<TDerivationType extends DerivationTypeUnion> = {
  networkPurpose: CommonNetworkPurposeRegTestExtendedUnion;
} & (TDerivationType extends DerivationTypeMap["taproot"]
  ? { keysDerivationInstance: InstanceType<typeof TaprootKeyDerivation> }
  : { keysDerivationInstance: InstanceType<typeof CommonBipKeyDerivation> });

type AdaParameters<TDerivationType extends DerivationTypeUnion> = {
  networkId: number;
} & {
  keysDerivationInstance: TDerivationType extends DerivationTypeMap["enterprise"]
    ? InstanceType<typeof EnterpriseKeyDerivation>
    : TDerivationType extends DerivationTypeMap["reward"]
    ? InstanceType<typeof RewardKeyDerivation>
    : InstanceType<typeof BaseKeyDerivation>;
};

type GetItemHandlerParameters<TDerivationType extends DerivationTypeUnion> =
  TDerivationType extends AvaxDerivationTypeUnion
    ? AvaxParameters
    : TDerivationType extends BtcDerivationTypeUnion
    ? BtcParameters<TDerivationType>
    : TDerivationType extends AdaDerivationTypeUnion
    ? AdaParameters<TDerivationType>
    : { keysDerivationInstance: CommonBipKeyDerivation };

export { type GetItemHandlerParameters };

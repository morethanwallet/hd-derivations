import { type CommonInconsistentDerivationParameters } from "./commonInconsistentDerivationParameters.type.js";
import { type DerivedItem } from "./derivedItem.type.js";
import { type NetworksTypesUnion } from "./networksTypeUnion.type.js";

type DeriveItemFromMnemonicParameters<TNetworkType extends NetworksTypesUnion> = {
  derivationPath: string;
} & CommonInconsistentDerivationParameters<TNetworkType>;

type DeriveItemFromMnemonic<TNetworkType extends NetworksTypesUnion> = (
  parameters: DeriveItemFromMnemonicParameters<TNetworkType>
) => DerivedItem<TNetworkType>;

export { type DeriveItemFromMnemonic, type DeriveItemFromMnemonicParameters };

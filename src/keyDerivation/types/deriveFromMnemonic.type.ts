// import { type CommonInconsistentDerivationParameters } from "./commonInconsistentDerivationParameters.type.js";
// import { type DerivationTypeUnion } from "./derivationTypeUnion.type.js";
// import { type DerivedItem } from "./derivedItem.type.js";

type DeriveFromMnemonicParameters<TDerivationType extends DerivationTypeUnion> = {
  derivationPath: string;
} & CommonInconsistentDerivationParameters<TDerivationType>;

type DeriveFromMnemonic<TDerivationType extends DerivationTypeUnion> = (
  parameters: DeriveFromMnemonicParameters<TDerivationType>
) => DerivedItem<TDerivationType>;

// export { type DeriveFromMnemonic, type DeriveFromMnemonicParameters };

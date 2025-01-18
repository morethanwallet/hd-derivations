import { TaprootKeyDerivation, CommonBipKeyDerivation } from "@/keyDerivation/index.js";
import { btcConfig } from "@/config/index.js";
import {
  type DeriveItemFromMnemonicParameters,
  type GetCredentialFromPrivateKeyParameters,
  type AbstractNetwork,
  type ConstructorParameters,
} from "../types/index.js";
import {
  type DerivedItem,
  type BtcDerivationTypeUnion,
  type DerivedCredential,
} from "@/types/index.js";
import { ExceptionMessage } from "../exceptions/index.js";
import {
  getLegacyItemHandlers,
  getNativeSegWitItemHandlers,
  getP2wshInP2shItemHandlers,
  getP2wshItemHandlers,
  getSegWitItemHandlers,
  getTaprootItemHandlers,
} from "./helpers/index.js";
import { type Handlers } from "./types/index.js";
import { findCustomConfig } from "../helpers/index.js";

class Bitcoin implements AbstractNetwork<BtcDerivationTypeUnion> {
  public handlers: Partial<Handlers>;

  public constructor({
    derivationConfigs,
    mnemonic,
    networkPurpose,
  }: ConstructorParameters<BtcDerivationTypeUnion>) {
    const keysDerivationHandlers = {
      legacy: getLegacyItemHandlers(
        new CommonBipKeyDerivation(
          findCustomConfig("legacy", derivationConfigs) ??
            btcConfig[networkPurpose].legacy.keysConfig,
          mnemonic
        )
      ),
      segWit: getSegWitItemHandlers(
        new CommonBipKeyDerivation(
          findCustomConfig("segWit", derivationConfigs) ??
            btcConfig[networkPurpose].segWit.keysConfig,
          mnemonic
        )
      ),
      nativeSegWit: getNativeSegWitItemHandlers(
        new CommonBipKeyDerivation(
          findCustomConfig("nativeSegWit", derivationConfigs) ??
            btcConfig[networkPurpose].nativeSegWit.keysConfig,
          mnemonic
        )
      ),
      taproot: getTaprootItemHandlers(
        new TaprootKeyDerivation(
          findCustomConfig("taproot", derivationConfigs) ??
            btcConfig[networkPurpose].taproot.keysConfig,
          mnemonic
        )
      ),
      p2wsh: getP2wshItemHandlers(
        new CommonBipKeyDerivation(
          findCustomConfig("p2wsh", derivationConfigs) ??
            btcConfig[networkPurpose].p2wsh.keysConfig,
          mnemonic
        )
      ),
      p2wshInP2sh: getP2wshInP2shItemHandlers(
        new CommonBipKeyDerivation(
          findCustomConfig("p2wshInP2sh", derivationConfigs) ??
            btcConfig[networkPurpose].p2wshInP2sh.keysConfig,
          mnemonic
        )
      ),
    };

    this.handlers = Object.fromEntries(
      derivationConfigs.map(({ derivationType }) => {
        return [derivationType, keysDerivationHandlers[derivationType]];
      })
    );
  }

  public deriveItemFromMnemonic({
    derivationType,
    base58RootKey,
    derivationPath,
  }: DeriveItemFromMnemonicParameters<BtcDerivationTypeUnion>): DerivedItem<BtcDerivationTypeUnion> {
    const derivationHandler = this.handlers[derivationType];

    if (!derivationHandler) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandler.deriveItemFromMnemonic({ base58RootKey, derivationPath });
  }

  public getCredentialFromPrivateKey({
    derivationType,
    privateKey,
  }: GetCredentialFromPrivateKeyParameters<BtcDerivationTypeUnion>): DerivedCredential<BtcDerivationTypeUnion> {
    const derivationHandler = this.handlers[derivationType];

    if (!derivationHandler) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandler.getCredentialFromPrivateKey({ privateKey });
  }
}

export { Bitcoin };

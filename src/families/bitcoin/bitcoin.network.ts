import { TaprootKeyDerivation, CommonBipKeyDerivation } from "@/keyDerivation/index.js";
import { btcConfig } from "@/config/index.js";
import {
  type DeriveItemFromMnemonicParameters,
  type GetCredentialFromPrivateKeyParameters,
  type AbstractNetwork,
  type ConstructorParameters,
  type DeriveItemsBatchFromMnemonicParameters,
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
  public handlers: NonNullable<Partial<Handlers>>;

  public constructor({
    derivationConfigs,
    mnemonic,
    networkPurpose,
  }: ConstructorParameters<BtcDerivationTypeUnion>) {
    const keysDerivationHandlers = {
      legacy: getLegacyItemHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("legacy", derivationConfigs) ??
            btcConfig[networkPurpose].legacy.keysConfig,
          mnemonic
        ),
      }),
      segWit: getSegWitItemHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("segWit", derivationConfigs) ??
            btcConfig[networkPurpose].segWit.keysConfig,
          mnemonic
        ),
      }),
      nativeSegWit: getNativeSegWitItemHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("nativeSegWit", derivationConfigs) ??
            btcConfig[networkPurpose].nativeSegWit.keysConfig,
          mnemonic
        ),
      }),
      taproot: getTaprootItemHandlers({
        keysDerivationInstance: new TaprootKeyDerivation(
          findCustomConfig("taproot", derivationConfigs) ??
            btcConfig[networkPurpose].taproot.keysConfig,
          mnemonic
        ),
      }),
      p2wsh: getP2wshItemHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("p2wsh", derivationConfigs) ??
            btcConfig[networkPurpose].p2wsh.keysConfig,
          mnemonic
        ),
      }),
      p2wshInP2sh: getP2wshInP2shItemHandlers({
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("p2wshInP2sh", derivationConfigs) ??
            btcConfig[networkPurpose].p2wshInP2sh.keysConfig,
          mnemonic
        ),
      }),
    };

    this.handlers = Object.fromEntries(
      derivationConfigs.map(({ derivationType }) => {
        return [derivationType, keysDerivationHandlers[derivationType]];
      })
    );
  }

  public deriveItemFromMnemonic({
    derivationType,
    ...parameters
  }: DeriveItemFromMnemonicParameters<BtcDerivationTypeUnion>): DerivedItem<BtcDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers(derivationType);

    return derivationHandlers.deriveItemFromMnemonic(parameters);
  }

  public getCredentialFromPrivateKey({
    derivationType,
    privateKey,
  }: GetCredentialFromPrivateKeyParameters<BtcDerivationTypeUnion>): DerivedCredential<BtcDerivationTypeUnion> {
    const derivationHandlers = this.getDerivationHandlers(derivationType);

    return derivationHandlers.getCredentialFromPrivateKey({ privateKey });
  }

  public deriveItemsBatchFromMnemonic({
    derivationType,
    ...parameters
  }: DeriveItemsBatchFromMnemonicParameters<BtcDerivationTypeUnion>): DerivedItem<BtcDerivationTypeUnion>[] {
    const derivationHandlers = this.getDerivationHandlers(derivationType);

    return derivationHandlers.deriveItemsBatchFromMnemonic(parameters);
  }

  private getDerivationHandlers(
    derivationType: BtcDerivationTypeUnion
  ): Handlers[BtcDerivationTypeUnion] | never {
    const derivationHandlers = this.handlers[derivationType];

    if (!derivationHandlers) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandlers;
  }
}

export { Bitcoin };

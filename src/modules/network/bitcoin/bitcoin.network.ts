import { TaprootKeyDerivation, CommonBipKeyDerivation } from "@/modules/keyDerivation/index.js";
import { btcConfig } from "@/modules/network/libs/modules/config/index.js";
import type {
  DeriveItemFromMnemonicParameters,
  GetCredentialFromPrivateKeyParameters,
  AbstractNetwork,
  ConstructorParameters,
  DeriveItemsBatchFromMnemonicParameters,
  CheckIfPrivateKeyBelongsToMnemonicParameters,
  DerivedCredential,
  DerivedItem,
  NetworkHandlers,
  BtcHandlers,
} from "@/modules/network/libs/types/index.js";
import { ExceptionMessage } from "@/modules/network/libs/enums/index.js";
import {
  getLegacyItemHandlers,
  getNativeSegWitItemHandlers,
  getP2wshInP2shItemHandlers,
  getP2wshItemHandlers,
  getSegWitItemHandlers,
  getTaprootItemHandlers,
} from "./libs/helpers/index.js";
import { findCustomConfig, getNetworkHandlers } from "@/modules/network/libs/helpers/index.js";
import { type BtcDerivationTypeUnion } from "@/libs/types/index.js";

class Bitcoin implements AbstractNetwork<BtcDerivationTypeUnion> {
  private handlers: NonNullable<Partial<BtcHandlers>>;

  public constructor({
    derivationConfigs,
    mnemonic,
    networkPurpose,
  }: ConstructorParameters<BtcDerivationTypeUnion>) {
    const keysDerivationHandlers: NetworkHandlers<BtcDerivationTypeUnion> = {
      legacy: getLegacyItemHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("legacy", derivationConfigs) ??
            btcConfig[networkPurpose].legacy.prefixConfig,
          mnemonic,
        ),
      }),
      segWit: getSegWitItemHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("segWit", derivationConfigs) ??
            btcConfig[networkPurpose].segWit.prefixConfig,
          mnemonic,
        ),
      }),
      nativeSegWit: getNativeSegWitItemHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("nativeSegWit", derivationConfigs) ??
            btcConfig[networkPurpose].nativeSegWit.prefixConfig,
          mnemonic,
        ),
      }),
      taproot: getTaprootItemHandlers({
        networkPurpose,
        keysDerivationInstance: new TaprootKeyDerivation(
          findCustomConfig("taproot", derivationConfigs) ??
            btcConfig[networkPurpose].taproot.prefixConfig,
          mnemonic,
        ),
      }),
      p2wsh: getP2wshItemHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("p2wsh", derivationConfigs) ??
            btcConfig[networkPurpose].p2wsh.prefixConfig,
          mnemonic,
        ),
      }),
      p2wshInP2sh: getP2wshInP2shItemHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("p2wshInP2sh", derivationConfigs) ??
            btcConfig[networkPurpose].p2wshInP2sh.prefixConfig,
          mnemonic,
        ),
      }),
    };

    this.handlers = getNetworkHandlers(derivationConfigs, keysDerivationHandlers);
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

  public checkIfPrivateKeyBelongsToMnemonic(
    parameters: CheckIfPrivateKeyBelongsToMnemonicParameters<BtcDerivationTypeUnion>,
  ): boolean {
    for (const handler of Object.values(this.handlers)) {
      if (handler.checkIfPrivateKeyBelongsToMnemonic(parameters)) return true;
    }

    return false;
  }

  private getDerivationHandlers(
    derivationType: BtcDerivationTypeUnion,
  ): BtcHandlers[BtcDerivationTypeUnion] | never {
    const derivationHandlers = this.handlers[derivationType];

    if (!derivationHandlers) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandlers;
  }
}

export { Bitcoin };

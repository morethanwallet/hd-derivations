import { TaprootKeyDerivation, CommonBipKeyDerivation } from "@/modules/key-derivation/index.js";
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
} from "@/modules/network/libs/types/index.js";
import { ExceptionMessage } from "@/modules/network/libs/enums/index.js";
import {
  getLegacyDerivationHandlers,
  getSegWitDerivationHandlers,
  getNativeSegWitDerivationHandlers,
  getTaprootDerivationHandlers,
  getP2wshDerivationHandlers,
  getP2wshInP2shDerivationHandlers,
} from "./libs/helpers/index.js";
import { findCustomConfig, getNetworkHandlers } from "@/modules/network/libs/helpers/index.js";
import { type BtcDerivationTypeUnion } from "@/libs/types/index.js";

class Bitcoin implements AbstractNetwork<BtcDerivationTypeUnion> {
  private handlers: NonNullable<Partial<NetworkHandlers<BtcDerivationTypeUnion>>>;

  public constructor({
    derivationConfigs,
    mnemonic,
    networkPurpose,
  }: ConstructorParameters<BtcDerivationTypeUnion>) {
    const networkHandlers: NetworkHandlers<BtcDerivationTypeUnion> = {
      legacy: getLegacyDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("legacy", derivationConfigs) ??
            btcConfig[networkPurpose].legacy.prefixConfig,
          mnemonic,
        ),
      }),
      segWit: getSegWitDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("segWit", derivationConfigs) ??
            btcConfig[networkPurpose].segWit.prefixConfig,
          mnemonic,
        ),
      }),
      nativeSegWit: getNativeSegWitDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("nativeSegWit", derivationConfigs) ??
            btcConfig[networkPurpose].nativeSegWit.prefixConfig,
          mnemonic,
        ),
      }),
      taproot: getTaprootDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new TaprootKeyDerivation(
          findCustomConfig("taproot", derivationConfigs) ??
            btcConfig[networkPurpose].taproot.prefixConfig,
          mnemonic,
        ),
      }),
      p2wsh: getP2wshDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("p2wsh", derivationConfigs) ??
            btcConfig[networkPurpose].p2wsh.prefixConfig,
          mnemonic,
        ),
      }),
      p2wshInP2sh: getP2wshInP2shDerivationHandlers({
        networkPurpose,
        keysDerivationInstance: new CommonBipKeyDerivation(
          findCustomConfig("p2wshInP2sh", derivationConfigs) ??
            btcConfig[networkPurpose].p2wshInP2sh.prefixConfig,
          mnemonic,
        ),
      }),
    };

    this.handlers = getNetworkHandlers(derivationConfigs, networkHandlers);
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
  ): NetworkHandlers<BtcDerivationTypeUnion>[BtcDerivationTypeUnion] | never {
    const derivationHandlers = this.handlers[derivationType];

    if (!derivationHandlers) throw new Error(ExceptionMessage.INVALID_DERIVATION_TYPE);

    return derivationHandlers;
  }
}

export { Bitcoin };

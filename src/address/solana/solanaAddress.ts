import { Keys } from "./keys/index.js";
import base58 from "bs58";
import {
  type AbstractAddress,
  type AddressMetadata,
  type AddressConfig,
  type KeyPair,
} from "../types/index.js";
import { Keypair } from "@solana/web3.js";
import { EMPTY_MNEMONIC, FIRST_ADDRESS_INDEX } from "../constants/index.js";
import { type DerivationPath } from "@/enums/index.js";

const DERIVATION_PATH_START_INDEX = 0;
const DERIVATION_PATH_ACCOUNT_START_INDEX = 11;
const DERIVATION_PATH_ACCOUNT_END_INDEX = 12;

class SolanaAddress extends Keys implements AbstractAddress<typeof DerivationPath.SOL> {
  private derivationPath: string;

  public constructor(addressConfig: AddressConfig, mnemonic?: string) {
    super(mnemonic);

    this.derivationPath = addressConfig.derivationPath;
  }

  public getAddressMetadata(addressIndex: number): AddressMetadata<typeof DerivationPath.SOL> {
    const path = this.getFullDerivationPath(addressIndex);
    const { privateKey, publicKey } = this.getKeyPair(path);

    return {
      privateKey,
      publicKey,
      path,
      address: publicKey,
      mnemonic: this.mnemonic,
    };
  }

  public importByPrivateKey(privateKey: string): AddressMetadata<typeof DerivationPath.SOL> {
    const mnemonicResults = searchFromMnemonic<typeof DerivationPath.SOL>(
      privateKey,
      this.getAddressMetadata.bind(this)
    );

    if (mnemonicResults !== null) return mnemonicResults;

    const keyPair = Keypair.fromSecretKey(base58.decode(privateKey));
    const publicKey = this.getPublicKey(keyPair);

    return {
      privateKey,
      publicKey,
      address: publicKey,
      path: this.getFullDerivationPath(FIRST_ADDRESS_INDEX),
      mnemonic: EMPTY_MNEMONIC,
    };
  }

  private getKeyPair(derivationPath: string): KeyPair {
    const rootKey = this.getRootKey();
    const keyPair = Keypair.fromSeed(rootKey.derive(derivationPath).privateKey);
    const publicKey = this.getPublicKey(keyPair);
    const privateKey = base58.encode(keyPair.secretKey);

    return { privateKey, publicKey };
  }

  private getFullDerivationPath(addressIndex: number): string {
    return `${this.derivationPath.slice(
      DERIVATION_PATH_START_INDEX,
      DERIVATION_PATH_ACCOUNT_START_INDEX
    )}${addressIndex}${this.derivationPath.slice(DERIVATION_PATH_ACCOUNT_END_INDEX)}`;
  }

  private getPublicKey(keyPair: Keypair): string {
    return keyPair.publicKey.toBase58();
  }
}

export { SolanaAddress };

import { Keys } from "./keys/index.js";
import {
  Bip32PrivateKey,
  BaseAddress,
  NetworkInfo,
  Credential,
  PrivateKey,
  type PublicKey,
} from "@emurgo/cardano-serialization-lib-nodejs";
import {
  type AbstractAddress,
  type CardanoAddressMetadata,
  type AddressConfig,
  type AddressMetadata,
} from "../types/index.js";
import { searchFromMnemonic } from "../helpers/index.js";
import { EMPTY_MNEMONIC, FIRST_ADDRESS_INDEX } from "../constants/index.js";
import { type DerivationPath } from "@/enums/index.js";

type RawKeys = {
  privateKey: PrivateKey;
  publicKey: PublicKey;
};

const HARDENED_RANGE_START = 2147483648;
const harden = (number: number): number => HARDENED_RANGE_START + number;

enum Change {
  EXTERNAL = 0,
  CHIMERIC = 2,
}

function convertDerivationPathToIntegersArray(derivationPath: string): string[] {
  const nanDerivationPathCharactersRegExp = /[m'/]/g;
  const spaceDelimiter = " ";

  return derivationPath
    .replaceAll(nanDerivationPathCharactersRegExp, spaceDelimiter)
    .split(spaceDelimiter)
    .filter((segment) => !Number.isNaN(Number.parseInt(segment)));
}

class CardanoAddress extends Keys implements AbstractAddress<typeof DerivationPath.ADA> {
  private derivationPath: string;

  public constructor(addressConfig: AddressConfig, mnemonic?: string) {
    super(mnemonic);

    this.derivationPath = addressConfig.derivationPath;
  }

  public getAddressMetadata(addressIndex: number): AddressMetadata<typeof DerivationPath.ADA> {
    const rootKey = this.getRootKey();
    const account = this.getAccount(rootKey);
    const paymentNode = this.getNode(account, addressIndex, Change.EXTERNAL);
    const stakingNode = this.getNode(account, addressIndex, Change.CHIMERIC);
    const rawPaymentKeys = this.getRawKeys(paymentNode);
    const rawStakingKeys = this.getRawKeys(stakingNode);
    const paymentCredential = this.getCredential(rawPaymentKeys.publicKey);
    const stakingCredential = this.getCredential(rawStakingKeys.publicKey);
    const address = this.generateAddress(paymentCredential, stakingCredential);

    return {
      address,
      privateKey: rawPaymentKeys.privateKey.to_hex(),
      publicKey: rawPaymentKeys.publicKey.to_hex(),
      stakingPrivateKey: rawStakingKeys.privateKey.to_hex(),
      stakingPublicKey: rawStakingKeys.publicKey.to_hex(),
      path: this.getFullDerivationPath(addressIndex, Change.EXTERNAL),
      stakingPath: this.getFullDerivationPath(addressIndex, Change.CHIMERIC),
      mnemonic: this.mnemonic,
    };
  }

  public importByPrivateKey(
    paymentPrivateKey: string,
    stakingPrivateKey: string
  ): AddressMetadata<typeof DerivationPath.ADA> {
    const mnemonicResults = searchFromMnemonic<typeof DerivationPath.ADA>(
      paymentPrivateKey,
      this.getAddressMetadata.bind(this)
    );

    if (mnemonicResults !== null) return mnemonicResults;

    const rawPaymentPublicKey = PrivateKey.from_hex(paymentPrivateKey).to_public();
    const rawStakingPublicKey = PrivateKey.from_hex(stakingPrivateKey).to_public();
    const paymentCredential = this.getCredential(rawPaymentPublicKey);
    const stakingCredential = this.getCredential(rawStakingPublicKey);
    const address = this.generateAddress(paymentCredential, stakingCredential);

    return {
      address,
      privateKey: paymentPrivateKey,
      publicKey: rawPaymentPublicKey.to_hex(),
      stakingPrivateKey: stakingPrivateKey,
      stakingPublicKey: rawStakingPublicKey.to_hex(),
      path: this.getFullDerivationPath(FIRST_ADDRESS_INDEX, Change.EXTERNAL),
      stakingPath: this.getFullDerivationPath(FIRST_ADDRESS_INDEX, Change.CHIMERIC),
      mnemonic: EMPTY_MNEMONIC,
    };
  }

  private getFullDerivationPath(addressIndex: number, change: number): string {
    return `${this.derivationPath}/${change}/${addressIndex}`;
  }

  private getAccount(rootKey: Bip32PrivateKey): Bip32PrivateKey {
    const pathSegments = convertDerivationPathToIntegersArray(this.derivationPath);
    let account = rootKey;

    for (let pathSegment of pathSegments) {
      account = account.derive(harden(Number(pathSegment)));
    }

    return account;
  }

  private getNode(account: Bip32PrivateKey, addressIndex: number, change: Change): Bip32PrivateKey {
    return account.derive(change).derive(addressIndex);
  }

  private getRawKeys(node: Bip32PrivateKey): RawKeys {
    const publicKey = node.to_public().to_raw_key();
    const privateKey = node.to_raw_key();

    return { privateKey, publicKey };
  }

  private getCredential(rawPublicKey: PublicKey): Credential {
    return Credential.from_keyhash(rawPublicKey.hash());
  }

  private generateAddress(paymentCredential: Credential, stakingCredential: Credential): string {
    const baseAddress = BaseAddress.new(
      NetworkInfo.mainnet().network_id(),
      paymentCredential,
      stakingCredential
    );

    return baseAddress.to_address().to_bech32();
  }
}

export { CardanoAddress };

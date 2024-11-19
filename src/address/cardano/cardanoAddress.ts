import { Keys } from "./keys/index.js";
import {
  Bip32PrivateKey,
  BaseAddress,
  NetworkInfo,
  Credential,
  PrivateKey,
  PublicKey,
  EnterpriseAddress,
  RewardAddress,
} from "@emurgo/cardano-serialization-lib-nodejs";
import {
  type CardanoAddressMetadata,
  type CardanoShelleyAddressType,
  type AbstractAddress,
  type AddressConfig,
} from "../types/index.js";
import {
  EMPTY_MNEMONIC,
  FIRST_ADDRESS_INDEX,
  SEARCH_FROM_MNEMONIC_LIMIT,
} from "../constants/index.js";
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

// TODO: Refactor typing and code

class CardanoAddress extends Keys implements AbstractAddress<typeof DerivationPath.ADA> {
  private derivationPath: string;

  public constructor(addressConfig: AddressConfig, mnemonic?: string) {
    super(mnemonic);

    this.derivationPath = addressConfig.derivationPath;
  }

  public getAddressMetadata<C extends CardanoShelleyAddressType>(
    addressIndex: number,
    addressType: C
  ): CardanoAddressMetadata<C> {
    const rootKey = this.getRootKey();
    const account = this.getAccount(rootKey);

    switch (addressType) {
      case "base": {
        return {
          ...this.getBaseAddressMetadata(account, addressIndex),
        } as CardanoAddressMetadata<C>;
      }
      case "reward": {
        return {
          ...this.getRewardAddressMetadata(account, addressIndex),
        } as CardanoAddressMetadata<C>;
      }
      case "enterprise": {
        return {
          ...this.getEnterpriseAddressMetadata(account, addressIndex),
        } as CardanoAddressMetadata<C>;
      }
    }

    throw new Error("Invalid Cardano address type");
  }

  public importByPrivateKey<C extends CardanoShelleyAddressType>(
    privateKey: string,
    rewardPrivateKey: C extends "base" ? string : null,
    addressType: C
  ): CardanoAddressMetadata<C> {
    for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
      const addressMetadata = this.getAddressMetadata<C>(i, addressType);

      if (this.isCardanoBaseAddress(addressMetadata)) {
        if (
          addressMetadata.enterprisePrivateKey === privateKey &&
          addressMetadata.rewardPrivateKey === rewardPrivateKey
        ) {
          return addressMetadata;
        }
      } else if (addressMetadata.privateKey === privateKey) {
        return addressMetadata;
      }
    }

    switch (addressType) {
      case "base": {
        return {
          ...this.importBaseMetadataByPrivateKey(privateKey, rewardPrivateKey!),
        } as CardanoAddressMetadata<C>;
      }
      case "reward": {
        return {
          ...this.importRewardMetadataByPrivateKey(privateKey),
        } as CardanoAddressMetadata<C>;
      }
      case "enterprise": {
        return {
          ...this.importEnterpriseMetadataByPrivateKey(privateKey),
        } as CardanoAddressMetadata<C>;
      }
    }

    throw new Error("Invalid Cardano address type");
  }

  private importEnterpriseMetadataByPrivateKey(
    privateKey: string
  ): CardanoAddressMetadata<"enterprise"> {
    const rawPublicKey = PrivateKey.from_hex(privateKey).to_public();
    const credential = this.getCredential(rawPublicKey);
    const address = this.getEnterpriseAddress(credential);

    return {
      address,
      privateKey,
      publicKey: rawPublicKey.to_hex(),
      path: this.getFullDerivationPath(FIRST_ADDRESS_INDEX, Change.EXTERNAL),
      mnemonic: EMPTY_MNEMONIC,
    };
  }

  private importRewardMetadataByPrivateKey(privateKey: string): CardanoAddressMetadata<"reward"> {
    const rawPublicKey = PrivateKey.from_hex(privateKey).to_public();
    const credential = this.getCredential(rawPublicKey);
    const address = this.getRewardAddress(credential);

    return {
      address,
      privateKey,
      publicKey: rawPublicKey.to_hex(),
      path: this.getFullDerivationPath(FIRST_ADDRESS_INDEX, Change.CHIMERIC),
      mnemonic: EMPTY_MNEMONIC,
    };
  }

  private importBaseMetadataByPrivateKey(
    enterprisePrivateKey: string,
    rewardPrivateKey: string
  ): CardanoAddressMetadata<"base"> {
    const rawEnterprisePublicKey = PrivateKey.from_hex(enterprisePrivateKey).to_public();
    const rawRewardPublicKey = PrivateKey.from_hex(rewardPrivateKey).to_public();
    const enterpriseCredential = this.getCredential(rawEnterprisePublicKey);
    const rewardCredential = this.getCredential(rawRewardPublicKey);
    const address = this.getBaseAddress(enterpriseCredential, rewardCredential);

    return {
      address,
      enterprisePrivateKey,
      rewardPrivateKey,
      enterprisePublicKey: rawEnterprisePublicKey.to_hex(),
      enterprisePath: this.getFullDerivationPath(FIRST_ADDRESS_INDEX, Change.EXTERNAL),
      rewardPublicKey: rawRewardPublicKey.to_hex(),
      rewardPath: this.getFullDerivationPath(FIRST_ADDRESS_INDEX, Change.CHIMERIC),
      mnemonic: EMPTY_MNEMONIC,
    };
  }

  private getEnterpriseAddressMetadata(
    account: Bip32PrivateKey,
    addressIndex: number
  ): CardanoAddressMetadata<"enterprise"> {
    const node = account.derive(Change.EXTERNAL).derive(addressIndex);
    const { privateKey, publicKey } = this.getRawKeys(node);
    const credential = this.getCredential(publicKey);
    const address = this.getEnterpriseAddress(credential);

    return {
      address,
      path: this.getFullDerivationPath(addressIndex, Change.EXTERNAL),
      privateKey: privateKey.to_hex(),
      publicKey: publicKey.to_hex(),
      mnemonic: this.mnemonic,
    };
  }

  private getRewardAddressMetadata(
    account: Bip32PrivateKey,
    addressIndex: number
  ): CardanoAddressMetadata<"reward"> {
    const node = account.derive(Change.CHIMERIC).derive(addressIndex);
    const { privateKey, publicKey } = this.getRawKeys(node);
    const credential = this.getCredential(publicKey);
    const address = this.getRewardAddress(credential);

    return {
      address,
      path: this.getFullDerivationPath(addressIndex, Change.CHIMERIC),
      privateKey: privateKey.to_hex(),
      publicKey: publicKey.to_hex(),
      mnemonic: this.mnemonic,
    };
  }

  private getBaseAddressMetadata(
    account: Bip32PrivateKey,
    addressIndex: number
  ): CardanoAddressMetadata<"base"> {
    const enterpriseAddressMetadata = this.getEnterpriseAddressMetadata(account, addressIndex);
    const rewardAddressMetadata = this.getRewardAddressMetadata(account, addressIndex);

    const enterpriseCredential = this.getCredential(
      PublicKey.from_hex(enterpriseAddressMetadata.publicKey)
    );

    const stakingCredential = this.getCredential(
      PublicKey.from_hex(rewardAddressMetadata.publicKey)
    );

    const address = this.getBaseAddress(enterpriseCredential, stakingCredential);

    return {
      address,
      enterprisePath: enterpriseAddressMetadata.path,
      enterprisePrivateKey: enterpriseAddressMetadata.privateKey,
      enterprisePublicKey: enterpriseAddressMetadata.publicKey,
      rewardPath: rewardAddressMetadata.path,
      rewardPrivateKey: rewardAddressMetadata.privateKey,
      rewardPublicKey: rewardAddressMetadata.publicKey,
      mnemonic: this.mnemonic,
    };
  }

  private getEnterpriseAddress(
    credential: Credential
  ): CardanoAddressMetadata<"enterprise">["address"] {
    const address = EnterpriseAddress.new(NetworkInfo.mainnet().network_id(), credential);

    return address.to_address().to_bech32();
  }

  private getRewardAddress(credential: Credential): CardanoAddressMetadata<"reward">["address"] {
    const address = RewardAddress.new(NetworkInfo.mainnet().network_id(), credential);

    return address.to_address().to_bech32();
  }

  private getBaseAddress(
    enterpriseCredential: Credential,
    rewardCredential: Credential
  ): CardanoAddressMetadata<"base">["address"] {
    const address = BaseAddress.new(
      NetworkInfo.mainnet().network_id(),
      enterpriseCredential,
      rewardCredential
    );

    return address.to_address().to_bech32();
  }

  private isCardanoBaseAddress(metadata: unknown): metadata is CardanoAddressMetadata<"base"> {
    return (
      typeof metadata === "object" &&
      !!metadata &&
      "rewardPrivateKey" in metadata &&
      "enterprisePrivateKey" in metadata
    );
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

  private getRawKeys(node: Bip32PrivateKey): RawKeys {
    const publicKey = node.to_public().to_raw_key();
    const privateKey = node.to_raw_key();

    return { privateKey, publicKey };
  }

  private getCredential(rawPublicKey: PublicKey): Credential {
    return Credential.from_keyhash(rawPublicKey.hash());
  }
}

export { CardanoAddress };

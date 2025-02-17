import type {
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
  ImportByPrivateKeyParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { CommonKeyPair } from "@/libs/types/index.js";
import { convertBytesToHex, convertHexToBytes } from "@/libs/utils/index.js";
import { DotMnemonic } from "@/libs/modules/mnemonic";
import { keyExtractSuri, keyFromPath } from "@polkadot/util-crypto";
import {
  schemeToKeyPairType,
  schemeToKeyPairDeriver,
  schemeToPublicKeyDeriver,
} from "./libs/maps/index.js";
import { DEV_PHRASE } from "./libs/constants/index.js";
import { DerivationPathSymbol } from "@/libs/enums/index.js";

class DotKeyDerivation implements AbstractKeyDerivation<"dotBase"> {
  private mnemonic: DotMnemonic;

  public constructor(mnemonic: DotMnemonic) {
    this.mnemonic = mnemonic;
  }

  public deriveFromMnemonic({
    derivationPath,
    scheme,
  }: DeriveFromMnemonicParameters<"dotBase">): CommonKeyPair {
    const mnemonic = this.mnemonic.getMnemonic();
    const uri = `${mnemonic}${derivationPath}`;

    const devFormattedUri = uri.startsWith(DerivationPathSymbol.DOT_HARDENED_DELIMITER)
      ? `${DEV_PHRASE}${uri}`
      : uri;

    const { path } = keyExtractSuri(devFormattedUri);
    const deriveKeyPair = schemeToKeyPairDeriver[scheme];

    const { publicKey, secretKey } = keyFromPath(
      deriveKeyPair(this.mnemonic.getSeed()),
      path,
      schemeToKeyPairType[scheme],
    );

    return this.getHexKeyPair(publicKey, secretKey);
  }

  public importByPrivateKey({
    privateKey,
    scheme,
  }: ImportByPrivateKeyParameters<"dotBase">): CommonKeyPair {
    const derivePublicKey = schemeToPublicKeyDeriver[scheme];
    const privateKeyBytes = convertHexToBytes(privateKey);
    const publicKeyBytes = derivePublicKey(privateKeyBytes);

    return this.getHexKeyPair(publicKeyBytes, privateKeyBytes);
  }

  private getHexKeyPair(publicKeyBytes: Uint8Array, privateKeyBytes?: Uint8Array): CommonKeyPair {
    const privateKey = privateKeyBytes ? convertBytesToHex(privateKeyBytes) : "";
    const publicKey = convertBytesToHex(publicKeyBytes);

    return { privateKey, publicKey };
  }
}

export { DotKeyDerivation };

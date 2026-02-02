import { getBase58EncodedKeyPair, importByPrivateKey } from "./libs/helpers/helpers.js";
import { getEd25519KeyPairFromSecp256k1RootKey } from "../../libs/helpers/index.js";

import { type Mnemonic } from "@/libs/modules/mnemonic/index.js";
import {
  type AbstractKeyDerivation,
  type DeriveFromMnemonicParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import { type PrivateKey, type CommonKeyPair } from "@/libs/types/types.js";
import { type Secp256k1Curve, type Ed25519Curve } from "@/libs/modules/curves/curves.js";

class SolExodusKeyDerivation implements AbstractKeyDerivation<"solExodus"> {
  private mnemonic: Mnemonic;
  private ed25519Curve: Ed25519Curve;
  private secp256k1Curve: Secp256k1Curve;

  public constructor(
    mnemonic: Mnemonic,
    ed25519Curve: Ed25519Curve,
    secp256k1Curve: Secp256k1Curve,
  ) {
    this.mnemonic = mnemonic;
    this.ed25519Curve = ed25519Curve;
    this.secp256k1Curve = secp256k1Curve;
  }

  public deriveFromMnemonic({
    derivationPath,
  }: DeriveFromMnemonicParameters<"solExodus">): CommonKeyPair {
    const { secretKey, publicKey } = getEd25519KeyPairFromSecp256k1RootKey({
      derivationPath,
      ed25519Curve: this.ed25519Curve,
      mnemonic: this.mnemonic,
      secp256k1Curve: this.secp256k1Curve,
    });

    return getBase58EncodedKeyPair(secretKey, publicKey);
  }

  public importByPrivateKey({ privateKey }: PrivateKey<"solExodus">): CommonKeyPair {
    return importByPrivateKey(privateKey, this.ed25519Curve);
  }
}

export { SolExodusKeyDerivation };

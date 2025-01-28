// import { type Mnemonic } from "@/mnemonic/index.js";
// import {
//   type DerivedCredential,
//   type DerivedItem,
//   type DeriveItemFromMnemonicParameters,
//   type GetCredentialFromPKParameters,
//   type AbstractNetwork,
//   type DerivedKeyPair,
// } from "@/families/types/index.js";
// import { config } from "./config/index.js";
// import { Keys } from "@/keys/bip32/index.js";
// import { assert, toHexFromBytes, toUint8Array } from "@/helpers/index.js";
// import { NetworkError, ExceptionMessage } from "../enums/index.js";
// import { ecPair, type ECPairInterface } from "@/ecc/index.js";
// import {
//   getAddressFromPrivateKey,
//   getPublicKeyFromPrivateKey,
// } from "@binance-chain/javascript-sdk/lib/crypto/index.js";

// const HRP = "bnb";

// class Bnb extends Keys implements AbstractNetwork<"bnb"> {
//   public constructor(mnemonic: Mnemonic) {
//     super(config.prefixConfig, mnemonic);
//   }

//   public deriveItemFromMnemonic({
//     derivationPath,
//   }: DeriveItemFromMnemonicParameters<"bnb">): DerivedItem<"bnb"> {
//     const node = this.rootKey.derivePath(derivationPath);
//     const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
//     const address = this.getAddress(privateKey);

//     return {
//       privateKey,
//       publicKey,
//       address,
//       derivationPath,
//     };
//   }

//   public getCredentialFromPK({
//     privateKey,
//   }: GetCredentialFromPKParameters<"bnb">): DerivedCredential<"bnb"> {
//     const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
//     const { publicKey } = this.getKeyPair(rawPrivateKey);
//     const address = this.getAddress(privateKey);

//     return {
//       privateKey,
//       publicKey,
//       address,
//     };
//   }

//   private getAddress(privateKey: DerivedKeyPair["privateKey"]): string {
//     return getAddressFromPrivateKey(privateKey, HRP);
//   }

//   private getKeyPair(rawPrivateKey?: Uint8Array): DerivedKeyPair {
//     assert(rawPrivateKey, NetworkError, ExceptionMessage.BNB_PRIVATE_KEY_GENERATION_FAILED);
//     const keyPair: ECPairInterface = ecPair.fromPrivateKey(rawPrivateKey);
//     const privateKey = toHexFromBytes(keyPair.privateKey);
//     const publicKey = getPublicKeyFromPrivateKey(privateKey);

//     return { privateKey, publicKey };
//   }
// }

// export { Bnb };

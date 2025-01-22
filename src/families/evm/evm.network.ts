// import { type Mnemonic } from "@/mnemonic/index.js";
// import {
//   type DerivedCredential,
//   type DerivedItem,
//   type DerivedKeyPair,
//   type DeriveItemFromMnemonicParameters,
//   type GetCredentialFromPrivateKeyParameters,
//   type AbstractNetwork,
// } from "@/families/types/index.js";
// import { config } from "./config/index.js";
// import { Keys } from "@/keys/bip32/index.js";
// import { toUint8Array } from "@/helpers/index.js";
// import {
//   addHexPrefix,
//   bufferToHex,
//   importPublic,
//   isHexPrefixed,
//   publicToAddress,
//   stripHexPrefix,
//   toChecksumAddress,
// } from "ethereumjs-util";
// import { ExceptionMessage } from "../enums/index.js";
// import { getKeyPairFromEc } from "../helpers/index.js";

// class Evm extends Keys implements AbstractNetwork<"evm"> {
//   public constructor(mnemonic: Mnemonic) {
//     super(config.keysConfig, mnemonic);
//   }

//   public deriveItemFromMnemonic({
//     derivationPath,
//   }: DeriveItemFromMnemonicParameters<"evm">): DerivedItem<"evm"> {
//     const node = this.rootKey.derivePath(derivationPath);
//     const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
//     const address = this.getAddress(publicKey);

//     return {
//       privateKey,
//       publicKey,
//       address,
//       derivationPath,
//     };
//   }

//   public getCredentialFromPrivateKey({
//     privateKey,
//   }: GetCredentialFromPrivateKeyParameters<"evm">): DerivedCredential<"evm"> {
//     const rawPrivateKey = toUint8Array(
//       Buffer.from(this.checkAndRemoveHexPrefix(privateKey), "hex")
//     );

//     const { publicKey } = this.getKeyPair(rawPrivateKey);
//     const address = this.getAddress(publicKey);

//     return {
//       privateKey,
//       publicKey,
//       address,
//     };
//   }

//   private getAddress(publicKey: DerivedKeyPair["publicKey"]): string {
//     const unprefixedPublicKey = this.checkAndRemoveHexPrefix(publicKey);
//     const publicKeyBuffer = this.getPublicKeyBuffer(
//       toUint8Array(Buffer.from(unprefixedPublicKey, "hex"))
//     );
//     const evmPublicKey = importPublic(publicKeyBuffer);
//     const addressBuffer = publicToAddress(evmPublicKey);
//     const hexAddress = addHexPrefix(addressBuffer.toString("hex"));

//     return toChecksumAddress(hexAddress);
//   }

//   private getKeyPair(rawPrivateKey?: Uint8Array): DerivedKeyPair {
//     const { privateKey, publicKey } = getKeyPairFromEc(
//       ExceptionMessage.EVM_PRIVATE_KEY_GENERATION_FAILED,
//       this.keysConfig,
//       rawPrivateKey
//     );

//     return {
//       privateKey: bufferToHex(Buffer.from(privateKey, "hex")),
//       publicKey: addHexPrefix(publicKey),
//     };
//   }

//   private getPublicKeyBuffer(publicKey: Uint8Array): Buffer {
//     return Buffer.from(publicKey.buffer, publicKey.byteOffset, publicKey.byteLength);
//   }

//   private checkAndRemoveHexPrefix(publicKey: DerivedKeyPair["publicKey"]): string {
//     return isHexPrefixed(publicKey) ? stripHexPrefix(publicKey) : publicKey;
//   }
// }

// export { Evm };

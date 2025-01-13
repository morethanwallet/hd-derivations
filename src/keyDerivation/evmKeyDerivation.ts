// import {
//   importPublic,
//   publicToAddress,
//   addHexPrefix,
//   toChecksumAddress,
//   bufferToHex,
//   isHexPrefixed,
//   stripHexPrefix,
// } from "ethereumjs-util";
// import { getKeyPairFromEc } from "./helpers/index.js";
// import { toUint8Array } from "@/helpers/index.js";
// import { ExceptionMessage } from "./exceptions/index.js";
// import { type Mnemonic } from "@/mnemonic/index.js";
// import { Keys } from "@/keys/bip32/index.js";
// import {
//   type DerivedCredential,
//   type DerivedItem,
//   type DerivedKeyPair,
//   type DeriveFromMnemonicParameters,
//   type ImportByPrivateKeyParameters,
//   type AbstractKeyDerivation,
// } from "./types/index.js";
// import { type DerivationType } from "./enums/index.js";
// import { type KeysConfig } from "@/keys/types/index.js";

// class EvmKeyDerivation extends Keys implements AbstractKeyDerivation<typeof DerivationType.EVM> {
//   public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
//     super(keysConfig, mnemonic);
//   }

//   public deriveFromMnemonic({
//     derivationPath,
//   }: DeriveFromMnemonicParameters<typeof DerivationType.EVM>): DerivedItem<
//     typeof DerivationType.EVM
//   > {
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

//   public importByPrivateKey({
//     privateKey,
//   }: ImportByPrivateKeyParameters<typeof DerivationType.EVM>): DerivedCredential<
//     typeof DerivationType.EVM
//   > {
//     // const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

//     // for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
//     //   const incrementedDerivationPath = appendAddressToDerivationPath(
//     //     derivationPathWithoutAddress,
//     //     i
//     //   );

//     //   const data = this.derive(incrementedDerivationPath);

//     //   if (data.privateKey === privateKey) return data;
//     // }

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

// export { EvmKeyDerivation };

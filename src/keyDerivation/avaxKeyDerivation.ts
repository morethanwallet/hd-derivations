// import { crypto } from "bitcoinjs-lib";
// import { toUint8Array } from "@/helpers/index.js";
// import { ExceptionMessage } from "./exceptions/index.js";
// import {
//   appendAddressToDerivationPath,
//   getKeyPairFromEc,
//   removeDerivationPathAddress,
// } from "./helpers/index.js";
// import { SEARCH_FROM_MNEMONIC_LIMIT } from "./constants/index.js";
// import { type Mnemonic } from "@/mnemonic/index.js";
// import { type NetworkPurposeUnion, type NetworkTypeUnion } from "@/families/avax/types/index.js";
// import {
//   type DerivedKeyPair,
//   type DerivedCredential,
//   type DerivedItem,
//   type DeriveFromMnemonicParameters,
//   type ImportByPrivateKeyParameters,
//   type AbstractKeyDerivation,
// } from "./types/index.js";
// import { type DerivationType } from "./enums/index.js";
// import { type KeysConfig } from "@/keys/types/index.js";
// import { Keys } from "@/keys/bip32/index.js";

// class AvaxKeyDerivation extends Keys implements AbstractKeyDerivation<typeof DerivationType.AVAX> {
//   public constructor(keysConfig: KeysConfig, mnemonic: Mnemonic) {
//     super(keysConfig, mnemonic);
//   }

//   public deriveFromMnemonic({
//     derivationPath,
//     networkType,
//     networkPurpose,
//   }: DeriveFromMnemonicParameters<typeof DerivationType.AVAX>): DerivedItem<
//     typeof DerivationType.AVAX
//   > {
//     const node = this.rootKey.derivePath(derivationPath);
//     const { privateKey, publicKey } = this.getKeyPair(node.privateKey);
//     const address = this.getAddress(node.publicKey, networkType, networkPurpose);

//     return {
//       privateKey,
//       publicKey,
//       address,
//       derivationPath,
//     };
//   }

//   public importByPrivateKey({
//     derivationPath,
//     privateKey,
//     networkType,
//     networkPurpose,
//   }: ImportByPrivateKeyParameters<typeof DerivationType.AVAX>): DerivedCredential<
//     typeof DerivationType.AVAX
//   > {
//     const derivationPathWithoutAddress = removeDerivationPathAddress(derivationPath);

//     for (let i = 0; i < SEARCH_FROM_MNEMONIC_LIMIT; i++) {
//       const incrementedDerivationPath = appendAddressToDerivationPath(
//         derivationPathWithoutAddress,
//         i
//       );

//       const data = this.deriveFromMnemonic({
//         networkType,
//         networkPurpose,
//         derivationPath: incrementedDerivationPath,
//       });

//       if (data.privateKey === privateKey) return data;
//     }

//     const rawPrivateKey = toUint8Array(Buffer.from(privateKey, "hex"));
//     const { publicKey } = this.getKeyPair(rawPrivateKey);

//     const address = this.getAddress(
//       toUint8Array(Buffer.from(publicKey, "hex")),
//       networkType,
//       networkPurpose
//     );

//     return {
//       privateKey,
//       publicKey,
//       address,
//     };
//   }

//   private getAddress(
//     publicKey: Uint8Array,
//     networkType: NetworkTypeUnion,
//     networkPurpose: NetworkPurposeUnion
//   ): string {
//     const address: string = utils.formatBech32(
//       networkPurpose === "mainnet" ? Hrp.MAINNET : Hrp.TESTNET,
//       crypto.hash160(publicKey)
//     );

//     return Prefix[networkType].concat(address);
//   }

//   private getKeyPair(rawPrivateKey?: Uint8Array): DerivedKeyPair {
//     return getKeyPairFromEc(
//       ExceptionMessage.AVAX_PRIVATE_KEY_GENERATION_FAILED,
//       this.keysConfig,
//       rawPrivateKey
//     );
//   }
// }

// export { AvaxKeyDerivation };

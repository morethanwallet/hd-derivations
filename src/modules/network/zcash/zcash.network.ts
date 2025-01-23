// import { ZcashTransparentAddress } from "@/keyDerivation/index.js";
// import { type Mnemonic } from "@/mnemonic/index.js";
// import { type AbstractNetwork } from "./types/index.js";
// import { type NetworkPurpose } from "@/families/index.js";
// import { config } from "./config/index.js";

// class Zcash implements AbstractNetwork {
//   private transparentAddress: ZcashTransparentAddress;

//   public constructor(mnemonic: Mnemonic, purpose: NetworkPurpose) {
//     this.transparentAddress = new ZcashTransparentAddress(
//       config[purpose].transparent.prefixConfig,
//       mnemonic
//     );
//   }

//   public derive(derivationPath: string) {
//     return this.transparentAddress.derive(derivationPath);
//   }

//   public importByPrivateKey(derivationPath: string, privateKey: string) {
//     return this.transparentAddress.importByPrivateKey(derivationPath, privateKey);
//   }
// }

// export { Zcash };

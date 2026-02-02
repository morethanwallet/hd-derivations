import { keyExtractSuri, keyFromPath } from "@polkadot/util-crypto";

import { curveToKeyPairType, curveToKeyPairDeriver } from "./libs/maps/maps.js";
import { DEV_PHRASE } from "./libs/constants/index.js";
import { convertBytesKeyPairToHex, importByPrivateKey } from "./libs/helpers/helpers.js";

import type {
  AbstractKeyDerivation,
  DeriveFromMnemonicParameters,
  ImportByPrivateKeyParameters,
} from "@/libs/modules/key-derivation/libs/types/index.js";
import type { CommonKeyPair } from "@/libs/types/types.js";
import { type DotMnemonic } from "@/libs/modules/mnemonic/index.js";
import { DerivationPathSymbol } from "@/libs/enums/enums.js";

class DotBaseKeyDerivation implements AbstractKeyDerivation<"dotBase"> {
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
    const deriveKeyPair = curveToKeyPairDeriver[scheme];

    const { publicKey, secretKey } = keyFromPath(
      deriveKeyPair(this.mnemonic.getSeed()),
      path,
      curveToKeyPairType[scheme],
    );

    return convertBytesKeyPairToHex(publicKey, secretKey);
  }

  public importByPrivateKey({
    privateKey,
    scheme,
  }: ImportByPrivateKeyParameters<"dotBase">): CommonKeyPair {
    return importByPrivateKey(privateKey, scheme);
  }
}

export { DotBaseKeyDerivation };

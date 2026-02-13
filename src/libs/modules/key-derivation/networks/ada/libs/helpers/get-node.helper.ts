import type { Bip32PrivateKey } from "@stricahq/bip32ed25519";

import { getDerivationPathNumericValues } from "./get-derivation-path-numeric-values.helper.js";

function getNode(rootKey: Bip32PrivateKey, derivationPath: string): Bip32PrivateKey {
  const numericDerivationPathValues = getDerivationPathNumericValues(derivationPath);

  let node = rootKey;

  for (const numericDerivationPathValue of numericDerivationPathValues) {
    node = node.derive(numericDerivationPathValue);
  }

  return node;
}

export { getNode };

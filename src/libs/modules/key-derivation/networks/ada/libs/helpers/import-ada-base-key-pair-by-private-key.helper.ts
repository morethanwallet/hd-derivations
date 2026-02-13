import { PrivateKey } from "@stricahq/bip32ed25519";

import { convertBytesToHex, convertHexToBytes } from "@/libs/utils/utils.js";
import type { AdaBaseKeyPair } from "@/libs/types/types.js";

function importAdaBaseKeyPairByPrivateKey(
  enterprisePrivateKey: string,
  rewardPrivateKey: string,
): AdaBaseKeyPair {
  const enterprisePrivateKeyInstance = new PrivateKey(
    Buffer.from(convertHexToBytes(enterprisePrivateKey)),
  );

  const rewardPrivateKeyInstance = new PrivateKey(Buffer.from(convertHexToBytes(rewardPrivateKey)));

  const enterprisePublicKeyInstance = enterprisePrivateKeyInstance.toPublicKey();
  const rewardPublicKeyInstance = rewardPrivateKeyInstance.toPublicKey();

  const enterprisePublicKey = convertBytesToHex(enterprisePublicKeyInstance.toBytes());
  const rewardPublicKey = convertBytesToHex(rewardPublicKeyInstance.toBytes());

  return {
    enterprisePrivateKey,
    enterprisePublicKey,
    rewardPrivateKey,
    rewardPublicKey,
  };
}

export { importAdaBaseKeyPairByPrivateKey };

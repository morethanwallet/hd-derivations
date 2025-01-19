import { type DeriveItemFromMnemonic } from "@/families/types/index.js";
import { type NetworkTypeUnion } from "@/types/network/index.js";

type DeriveItemFromMnemonicHandler = DeriveItemFromMnemonic<NetworkTypeUnion>;

function checkIfPrivateKeyBelongsToMnemonic(
  derivationPath: string,
  deriveItemFromMnemonicHandler
): boolean {}

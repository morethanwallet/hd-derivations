import type { DerivedItem } from "../types/index.js";

import type { CommonPrivateKey, DerivationTypeUnion } from "@/libs/types/types.js";

function doesPKExistInBatch<T extends DerivationTypeUnion>(
  batch: DerivedItem<T>[],
  privateKey: CommonPrivateKey["privateKey"],
): boolean {
  return batch.some((item) => {
    const isCommonPrivateKey = "privateKey" in item;
    const isEnterprisePrivateKey = "enterprisePrivateKey" in item;
    const isRewardPrivateKey = "rewardPrivateKey" in item;

    if (isCommonPrivateKey && item.privateKey === privateKey) {
      return true;
    }

    if (isEnterprisePrivateKey && item.enterprisePrivateKey === privateKey) {
      return true;
    }

    if (isRewardPrivateKey && item.rewardPrivateKey === privateKey) {
      return true;
    }

    return false;
  });
}

export { doesPKExistInBatch };

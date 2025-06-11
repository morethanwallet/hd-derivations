import type { InstanceParameters, NetworkTypeUnion } from "@/modules/network/libs/types/index.js";

type GetNetworkParameters<T extends NetworkTypeUnion> = {
  network: T;
} & InstanceParameters[T];

export type { GetNetworkParameters };

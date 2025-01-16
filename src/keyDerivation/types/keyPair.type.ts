type CommonKeyPair = {
  publicKey: string;
  privateKey: string;
};

type CardanoBaseKeyPair = {
  enterprisePrivateKey: string;
  enterprisePublicKey: string;
  rewardPrivateKey: string;
  rewardPublicKey: string;
};

export { type CommonKeyPair, type CardanoBaseKeyPair };

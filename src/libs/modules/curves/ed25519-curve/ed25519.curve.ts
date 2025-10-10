import { derivePath, getPublicKey } from "ed25519-hd-key";

type Keys = {
  chainCode: Buffer;
  key: Buffer;
};

class Ed25519Curve {
  public getPublicKeyBuffer(privateKeyBuffer: Buffer, hasZeroByte: boolean) {
    return getPublicKey(privateKeyBuffer, hasZeroByte);
  }

  public derivePath(derivationPath: string, hexSeed: string): Keys {
    return derivePath(derivationPath, hexSeed);
  }
}

export { Ed25519Curve };

import { derivePath, getPublicKey } from "ed25519-hd-key";

import { Ed25519PrivateKeyBytePosition } from "./libs/enums/enums.js";

type Keys = {
  chainCode: Buffer;
  key: Buffer;
};

class Ed25519Curve {
  public getPublicKeyBuffer(privateKeyBuffer: Buffer, hasZeroByte: boolean): Buffer {
    const secretKeyBuffer = privateKeyBuffer.subarray(
      Ed25519PrivateKeyBytePosition.START,
      Ed25519PrivateKeyBytePosition.END,
    );

    return getPublicKey(secretKeyBuffer, hasZeroByte);
  }

  public derivePath(derivationPath: string, hexSeed: string): Keys {
    return derivePath(derivationPath, hexSeed);
  }
}

export { Ed25519Curve };

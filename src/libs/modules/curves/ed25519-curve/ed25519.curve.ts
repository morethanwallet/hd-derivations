import { derivePath, getPublicKey } from "ed25519-hd-key";
import { Ed25519SecretKeyBytePosition } from "./libs/enums/enums";

type Keys = {
  chainCode: Buffer;
  key: Buffer;
};

class Ed25519Curve {
  public getPublicKeyBuffer(privateKeyBuffer: Buffer, hasZeroByte: boolean): Buffer {
    const secretKeyBuffer = privateKeyBuffer.subarray(
      Ed25519SecretKeyBytePosition.START,
      Ed25519SecretKeyBytePosition.END,
    );

    return getPublicKey(secretKeyBuffer, hasZeroByte);
  }

  public derivePath(derivationPath: string, hexSeed: string): Keys {
    return derivePath(derivationPath, hexSeed);
  }
}

export { Ed25519Curve };

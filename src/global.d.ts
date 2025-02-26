export declare global {
  interface ObjectConstructor {
    keys<T extends object>(obj: T): Array<keyof T>;
    keys(obj: string | unknown[]): string[];
    entries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]>;
  }
}

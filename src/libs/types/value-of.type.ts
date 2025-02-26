type Primitive = string | number | boolean | bigint | symbol | undefined | null;

type AnyArray<Type = any> = Array<Type> | ReadonlyArray<Type>;

type AnyFunction<Args extends any[] = any[], ReturnType = any> = (...args: Args) => ReturnType;

type ValueOf<Type> = Type extends Primitive
  ? Type
  : Type extends AnyArray
    ? Type[number]
    : Type extends AnyFunction
      ? ReturnType<Type>
      : Type[keyof Type];

export type { ValueOf };

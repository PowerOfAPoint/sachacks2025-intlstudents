export type Result<T = void, E = Error> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: E;
    };

export function ok<T>(data?: T | void): Result<T | void, never> {
  return {
    ok: true,
    data,
  };
}

export function err<E>(error?: E): Result<never, E> {
  return {
    ok: false,
    error: error ?? (new Error() as E),
  };
}

export type AwaitedReturn<T extends (...args: any[]) => any> = Awaited<
  ReturnType<T>
>;

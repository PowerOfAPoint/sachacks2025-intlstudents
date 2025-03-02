export type Result<T = void, E = Error> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: E;
    };

export type AsyncResult<T = void, E = Error> = Promise<Result<T, E>>;

export function ok<T = void, E = Error>(data?: T): Result<T, E> {
  return {
    ok: true,
    data: data as T,
  };
}

export function err<T = void, E = Error>(error?: E): Result<T, E> {
  return {
    ok: false,
    error:
      error === undefined
        ? (new Error("Unknown error") as unknown as E)
        : error,
  };
}

export type AwaitedReturn<T extends (...args: any[]) => any> = Awaited<
  ReturnType<T>
>;

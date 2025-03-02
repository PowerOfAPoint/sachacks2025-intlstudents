"use server";

import { redirect as _redirect } from "next/navigation";

type Params = Parameters<typeof _redirect>;

export async function redirect(url: Params[0], type?: Params[1]) {
  return _redirect(url, type);
}

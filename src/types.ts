// deno-lint-ignore-file no-explicit-any

import { RouterContext, RouteParams } from "@deps";

export interface FormError {
    field: string;
    message: string;
}

export type OakContext<R extends string> = RouterContext<R, RouteParams<R>, Record<string, any>>;
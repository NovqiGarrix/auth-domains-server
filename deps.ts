// Oak HTTP Server
export { Application, Router, isHttpError, Context, Status } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
export type { Middleware } from 'https://deno.land/x/oak@v11.1.0/mod.ts';

// Oak Router
export type { RouteParams, RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";

// Object Modeling for Deno (OMD)
export { novo } from 'https://raw.githubusercontent.com/NovqiGarrix/novo/main/mod.ts';
export type { Filter, Document, FindOptions } from 'https://raw.githubusercontent.com/NovqiGarrix/novo/main/mod.ts';

// Populate environment variables from .env file
export { configAsync } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts';

// Redis Client
export { connect as connectRedis } from 'https://deno.land/x/redis@v0.26.0/mod.ts';
export type { Redis } from 'https://deno.land/x/redis@v0.26.0/mod.ts';

// Logger
export { ConsoleTransport, Format, Houston, LogLevel, LogLevelDisplay, FileTransport, TextPrefix, Color, TimeFormat } from 'https://deno.land/x/houston@1.0.0/mod.ts';

// Base64
export { decode as decodeBase64, encode as encodeBase64 } from 'https://deno.land/std@0.82.0/encoding/base64.ts';

// Zod
export { z } from 'https://deno.land/x/zod@v3.18.0/mod.ts';

// CORS
export { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';

// Json Web Token
export { decode, create as createJWT, verify as verifyJWT } from 'https://deno.land/x/djwt@v2.7/mod.ts';

// Colors
export { red } from 'https://deno.land/std@0.152.0/fmt/colors.ts';

// Dayjs
import dayjs from 'https://deno.land/x/deno_dayjs@v0.2.1/mod.ts';
export { dayjs };

// Argon2 (Password Encryption)
export { hash as hashPassword, verify as verifyPassword } from 'https://deno.land/x/scrypt@v4.2.1/mod.ts';

// Web_Bson
export { ObjectId } from 'https://deno.land/x/web_bson@v0.2.4/mod.ts';
// deno-lint-ignore-file no-explicit-any
import { Context, Status } from '@deps';
import jwt from '@utils/jwt.ts';

export default async function authMiddlware(ctx: Context<Record<string, any>, Record<string, any>>, next: () => Promise<unknown>) {

    const { request: req } = ctx;

    // We're gonna put the access token from the server in the Authorization Header
    // in the client request header.
    // The value should looks like this: Bearer eyJhbGciOiJ....

    // We split the value with `Bearer `, and take the second index of the array which is the access token.
    const accessToken = req.headers.get("Authorization")?.split("Bearer ")?.[1];

    // If the access token is not present, we return an error.
    ctx.assert(accessToken, Status.Unauthorized, "Please login to continue!");

    // Then, verify the access token with jwt
    // This function will return the jwt payload, or undefined if the jwt isn't valid
    const aValidAccessToken = await jwt.verify<{ email: string }>(accessToken);

    // Throw an HTTP Error if the JWT isn't valid
    if (!aValidAccessToken) ctx.throw(Status.BadRequest, "Please login to continueaaa!");

    // Set the email in the server request state,
    // so that `me` function can use it later 
    ctx.state.email = aValidAccessToken.email;

    // Access Token is Valid, continue request to controller
    return next();

}
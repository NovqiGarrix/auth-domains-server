import { hashPassword, Status, verifyPassword } from '@deps';
import { OakContext } from '@types';

import jwt from '@utils/jwt.ts';
import UserModel from '@models/user.model.ts';

// "/login" is the route path.
export const login = async (ctx: OakContext<"/login">) => {

    const { request: req, response: res } = ctx;

    const { value, type } = req.body();

    // Throw an HTTP Error if the body type is not JSON
    ctx.assert(type === "json", Status.BadRequest, "Invalid request body");

    const { email, password } = await value;

    // Throw an HTTP Error if the email is undefined or not set
    ctx.assert(email, Status.BadRequest, "Email is required");

    // Throw an HTTP Error if the user password is undefined or not set
    ctx.assert(password, Status.BadRequest, "Password is required");

    // Let's check if the user with that email is existed
    const user = await UserModel.findOne({ email });
    if (!user) ctx.throw(Status.NotFound, "Invalid email or password");

    // In this section, we know that the user is exist.
    // Let's check his password

    const isAValidPassword = verifyPassword(password, user.password);
    if (!isAValidPassword) ctx.throw(Status.BadRequest, "Invalid email or password");

    /**
     * In this section, the user is valid and verified.
     * 
     * Let's return some data for the front end
     */

    const EXPIRES_IN = (60 * 10) * 1000 // in miliseconds;

    // Create the JWT
    const accessToken = await jwt.sign({ email: user.email }, EXPIRES_IN / 1000);

    res.status = Status.OK;

    /**
     * Since, Client and Server are in the different domains,  
     * the server can't set the cookie, so we have to send the access token along with the expires in
     * and let the client set the cookie manually
    */
    res.body = {
        data: {
            accessToken,
            expiresIn: EXPIRES_IN
        },
        error: null
    }

}

// "/register" is the route path
export const register = async (ctx: OakContext<"/register">) => {

    const { request: req, response: res } = ctx;

    const { value, type } = req.body();

    // Throw an HTTP Error if the body type is not JSON
    ctx.assert(type === "json", Status.BadRequest, "Invalid request body");

    const { email, password, name } = await value;

    /**
     * For validation, you can use zod here
     * I'll keep it simple, since this is a tutorial
     */

    // Create the user
    await UserModel.create({
        email,
        password: hashPassword(password),
        name
    });

    // ---- After created the user, you may send an email verification here ----

    // Set Response Status
    res.status = Status.OK;

    // Set Response Body
    res.body = {
        status: "OK"
    }

}

export const me = async (ctx: OakContext<"/me">) => {

    const { response: res, state } = ctx;

    // State is pretty the same like res.locals in express.js

    // We'll set the email in the middleware
    const email = state.email;

    // Find The User
    const user = await UserModel.findOne({ email });

    // If the user does not exist, return null in the response body
    if (!user) {
        res.status = Status.NotFound;
        res.body = {
            data: null,
            error: null
        }

        return;
    }

    // Don't send the password data, to the client
    const { password: _, ...rest } = user;

    // Set the response status
    res.status = Status.OK;

    // Set the response body
    res.body = {
        data: rest,
        error: null
    }

}
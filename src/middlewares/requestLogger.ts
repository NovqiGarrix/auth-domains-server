// deno-lint-ignore-file no-explicit-any

import { Context, red } from '@deps';
import logger from '@utils/logger.ts';

export default async function requestLogger({ request, response }: Context<Record<string, any>, Record<string, any>>, next: () => Promise<unknown>) {
    const startTime = Date.now();

    try {
        if (request.url.pathname === "/favicon.ico") {
            return await next();
        }

        logger.info(`[METHOD]: "${request.method}" [ENDPOINT]: "${request.originalRequest.url}"`);
        await next();

        const endTime = Date.now();
        const time = endTime - startTime;

        logger.success(`[TOOK]: ${time}ms [METHOD]: "${request.method}" [CODE]: "${response.status}" [ENDPOINT]: "${request.originalRequest.url.slice(0, 200)}..."`)
    } catch (error) {
        logger.error(error.message);
        response.status = error.status ?? 500;

        const endTime = Date.now();
        const time = endTime - startTime;
        logger.info(red(`[TOOK]: ${time}ms [METHOD]: "${request.method}" [STATUS]: "${error.status}" [ENDPOINT]: "${request.originalRequest.url.slice(0, 200)}..."`));

        if (error.status === 500) {
            response.body = {
                data: null,
                error: "An error occured while doing your request!"
            }
            return;
        }

        response.body = {
            data: null,
            error: error.message
        }
    }

}
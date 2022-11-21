import { configAsync } from '@deps';

import createServer from '@app';
import logger from '@utils/logger.ts';
import jwt from '@utils/jwt.ts';

const env = await configAsync();
const abortController = new AbortController();

const DENO_ENV = Deno.env.get("DENO_ENV") || env.DENO_ENV;
const IS_PROD = DENO_ENV === "prod";

const PORT = +(Deno.env.get("PORT") || env.PORT) || 4000;

const app = createServer();

const signals = ["SIGINT", "SIGTERM"];
for (let systemSignal of signals) {
    if (Deno.build.os === "windows" && systemSignal === "SIGTERM") {
        systemSignal = "SIGBREAK"
    }
    Deno.addSignalListener(systemSignal as Deno.Signal, () => {
        logger.warning(`Received ${systemSignal}, exiting...`.toUpperCase());
        Deno.exit(0);
    })
}

globalThis.addEventListener("unload", () => {
    abortController.abort();
})

app.addEventListener("listen", ({ hostname, port, serverType }) => {
    logger.info(`Listening on ${hostname}:${port} with ${serverType} SERVER`.toUpperCase());

    logger.info(`SETTING UP JWT KEY`);
    jwt.setKey().catch((error) => {
        logger.error(error.message);
        Deno.exit(1);
    });
})

await app.listen({ port: PORT, hostname: IS_PROD ? undefined : "localhost", signal: abortController.signal });
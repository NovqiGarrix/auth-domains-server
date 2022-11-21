import jwt from "@utils/jwt.ts";
import logger from '@utils/logger.ts';


await jwt.exportKey()
    .then((key) => {
        logger.success(`YOUR JWT KEY: ${key}`);
        Deno.exit(0);
    })
    .catch((err) => {
        logger.error(err.message);
        Deno.exit(1);
    })
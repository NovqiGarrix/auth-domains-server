import { Redis, connectRedis, configAsync } from '@deps';

const env = await configAsync();
export class RedisClient {

    public static redisClient: Redis;

    public static async getClient(): Promise<Redis> {
        if (this.redisClient) return this.redisClient;

        const REDIS_HOSTNAME = Deno.env.get("REDIS_HOSTNAME") || env.REDIS_HOSTNAME;
        const REDIS_PORT = +(Deno.env.get("REDIS_PORT") || env.REDIS_PORT);
        const REDIS_PASSWORD = Deno.env.get("REDIS_PASSWORD") || env.REDIS_PASSWORD;

        this.redisClient = await connectRedis({
            hostname: REDIS_HOSTNAME,
            port: REDIS_PORT,
            password: REDIS_PASSWORD,
            tls: true
        })

        return this.redisClient;

    }

}
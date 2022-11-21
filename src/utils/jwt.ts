import { configAsync, decodeBase64, encodeBase64, createJWT, verifyJWT } from '@deps';

// Get the variables from .env file using dotenv module
const env = await configAsync();

export interface JWTPayload {
    [propName: string]: unknown
}

function str2ab(str: string) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}


class JsonWebToken {

    public key: CryptoKey | undefined = undefined;

    generateKey(): Promise<CryptoKey> {
        return crypto.subtle.generateKey(
            {
                name: "HMAC",
                hash: "SHA-512"
            },
            true,
            ["sign", "verify"]
        );
    }

    async setKey(): Promise<void> {
        // Get the key from .env
        const exportedKey = Deno.env.get("JWT_KEY") || env.JWT_KEY;
        if (!exportedKey) throw new Error("JWT Key hasn't initialized yet!");

        const decoder = new TextDecoder();

        // We decoded the key from base64
        const decodedUinArray = decodeBase64(exportedKey);

        // Then we convert the result from UinArray to string
        const decodedStringKey = decoder.decode(decodedUinArray);

        // From string we convert again to ArrayBuffer
        const exportedArrayBuffer = str2ab(decodedStringKey);

        // Then use CryptoAPI import function to turn ArrayBuffer into CryptoKey
        const theKey = await crypto.subtle.importKey("raw", exportedArrayBuffer, {
            name: "HMAC",
            hash: "SHA-512"
        }, true, ["sign", "verify"]);

        this.key = theKey;
    }

    /**
     * Export the CryptoKey to base64 string
     */
    async exportKey(): Promise<string> {

        const decoder = new TextDecoder();

        // Generate the key
        const cryptoKey = await this.generateKey();

        // Export to ArrayBuffer
        const exportedArrayBufferKey = await crypto.subtle.exportKey("raw", cryptoKey);

        // Convert to String
        const exportedStringKey = decoder.decode(exportedArrayBufferKey);

        // Convert to base64
        const exportedBase64Key = encodeBase64(exportedStringKey);

        // Return it.
        return exportedBase64Key;

    }

    /**
     * 
     * @param payload The payload to be encoded
     * @param expiresIn JWT Expirres in (in seconds)
     * @returns string of JWT
     */
    sign(payload: JWTPayload, expiresIn: number): Promise<string> {
        if (!this.key) throw new Error("Please set the CryptoKey before using this function!");
        return createJWT({ alg: "HS512" }, { ...payload, exp: Date.now() + (expiresIn * 1000) }, this.key);
    }

    async verify<T>(jwt: string): Promise<T | null> {
        // Throw an error if the key is not set yet
        if (!this.key) throw new Error("Please set the CryptoKey before using this function!");

        // Verify the JWT
        const { aud: _aud, exp, iat: _iat, iss: _iss, jti: _jti, nbf: _nbf, sub: _sub, ...payload } = await verifyJWT(jwt, this.key);

        const now = Date.now();

        // Check if the JWT is expired
        if (now >= (exp ?? now)) return null;

        // Return the payload
        return payload as unknown as T;

    }

}

const jwt = new JsonWebToken();
export default jwt;
import Config from "../../pilot-app.config";
import * as jose from "jose";

export function TokenAdapter() {
    const SECRET = new TextEncoder().encode(Config.appPrivateKey)

    async function decode(token) {
        try {
            const decodedData = await jose.jwtVerify(token, SECRET)
            decodedData.payload.token = token
            return decodedData.payload;
        }
        catch (error) {
            console.error("Application failed to decode incoming server data")
            console.error(error)
            return {}
        }
    }

    return { decode }
}
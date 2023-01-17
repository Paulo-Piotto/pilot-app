import Config from "../../pilot-app.config";
import * as jose from "jose";

export function TokenAdapter() {
    console.log("CONFIG: ", Config.appPrivateKey)

    async function decode(token) {
        const SECRET = new TextEncoder().encode(Config.appPrivateKey)

        try {
            const decodedData = await jose.jwtVerify(token, SECRET)
            console.log("DECODED DATA PAYLOAD:")
            console.log(decodedData.payload)
            return decodedData.payload;
        }
        catch (error) {
            console.error("Application failed to decode incoming server data")
            console.error("token: ", token)
            console.error(error)
            return {}
        }
    }

    return {
        decode
    }

}
/* import Config from "../../pilot-app.config";

export function decodeComunicationToken(token) {
    try {
        const decodedData = jwt.verify(token, Config.appPrivateKey)
        console.log("DECODED DATA:")
        console.log(decodedData)
        return decodedData;
    }
    catch (error) {
        console.error("Application failed to decode incoming server data")
        console.error(error)
        return {}
    }
} */
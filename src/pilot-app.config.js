const Config = {
    serverBaseURL: process.env.REACT_APP_SERVER_URL,
    rolesLevel: {// Represents the hierarchy of roles. The grater number is the greater role, and so on
        new: 0,
        basic: 1,
        admin: 2,
        root: 3,
    },
    appPrivateKey: process.env.REACT_APP_PRIVATE_KEY
}


export default Config;
const Config = {
    serverBaseURL: 'http://localhost:5000',
    //serverBaseURL: 'http://3.82.151.240:80/',
    rolesLevel: {// Represents the hierarchy of roles. The grater number is the greater role, and so on
        new: 0,
        basic: 1,
        admin: 2,
        root: 3,
    },
    appPrivateKey: "elespassaraoeupassarinho"
}

export default Config;
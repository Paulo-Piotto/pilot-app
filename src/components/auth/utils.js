import Config from "../../pilot-app.config";

export async function handleSubmission({
    submissionData,
    validator,
    errorSetter,
    service,
    callbackFunction
}) {
    const validation = {};

    for(const key in submissionData) validation[key] = validator[key](submissionData[key]);
    errorSetter(prevState => ({
        ...prevState,
        ...validation
    }))

    for(const key in validation) if(!validation[key].isValid) return console.error(validation);

    try {
        const requestResult = await service(submissionData);
        callbackFunction(requestResult);
    } catch(error) {
        console.error("AUTH REQUEST FAILED")
        console.error(error)
        errorSetter(prevState => ({
            ...prevState,
            api: { isValid: false, errorMessage: error.response?.data ?? "Failed to comunicate to server"}
        }))
    }
}

function getLowestRole(rolesHierarchy) {
    const lowest = {
        value: Infinity,
        name: ""
    }

    for(const role in rolesHierarchy) {
        if(rolesHierarchy[role] < lowest.value) {
            lowest.value = rolesHierarchy[role]
            lowest.name = role
        }
    }
    return lowest.name
}

export const animationTransitionConfiguration = {
    type: "spring",
    stiffness: 250,
    damping: 30,
    duration: .1
}

export const loadingAnimationSegments = {
    loading: [0, 326],
    sucess: [326, 418],
    failure: [700, 841]
}

export const registerErrorFormat = {
    name: { isValid: true, errorMessage: "" },
    email: { isValid: true, errorMessage: "" },
    password: { isValid: true, errorMessage: "" },
    api: { isValid: true, errorMessage: ""}
}

export const newUserFormat = {
    name: "",
    roleName: getLowestRole(Config.rolesLevel),
    email: "",
    password: "",
    passwordConfirmation: ""
}

export const loginErrorFormat = {
    email: { isValid: true, errorMessage: "" },
    password: { isValid: true, errorMessage: "" },
    api: { isValid: true, errorMessage: "" }
}



export const loginDataFormat = { email: "", password: "" }
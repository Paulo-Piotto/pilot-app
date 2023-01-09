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
        console.log("REQUEST SUCCEEDED")
        console.log(requestResult.data)
        callbackFunction(requestResult.data);
    } catch(error) {
        console.error("REQUEST FAILED")
        console.error(error)
        errorSetter(prevState => ({
            ...prevState,
            api: { isValid: false, errorMessage: error.response.data }
        }))
    }
}

export const animationTransitionConfiguration = {
    type: "spring",
    stiffness: 250,
    damping: 30,
    duration: .1
}

export const registerErrorFormat = {
    name: { isValid: true, errorMessage: "" },
    email: { isValid: true, errorMessage: "" },
    password: { isValid: true, errorMessage: "" },
    api: { isValid: true, errorMessage: ""}
}

export const newUserFormat = {
    name: "",
    roleId: 3,
    email: "",
    password: ""
}

export const loginErrorFormat = {
    email: { isValid: true, errorMessage: "" },
    password: { isValid: true, errorMessage: "" },
    api: { isValid: true, errorMessage: "" }
}

export const loginDataFormat = { email: "", password: "" }
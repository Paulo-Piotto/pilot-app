export async function handleSubmission({
    submissionData,
    validator,
    errorSetter,
    service
}) {
    const validation = {};

    for(const key in submissionData) validation[key] = validator[key](submissionData[key]);
    errorSetter(prevState => ({
        ...prevState,
        ...validation
    }))

    for(const key in validation) if(!validation[key].isValid) { return console.log(validation) };

    try {
        const requestResult = await service(submissionData);
        console.log("SUCESS")
        console.log(requestResult.data)
    } catch(error) {
        console.log("FAILURE")
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
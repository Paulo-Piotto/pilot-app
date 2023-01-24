export function objectHasBeenChanged(before, after) {
    console.log("Before")
    console.log(before)

    console.log("AFTER")
    console.log(after)
    const beforeObjectKeys = Object.keys(before);
    const afterObjectKeys = Object.keys(after);
    if(beforeObjectKeys.length !== afterObjectKeys.length) return true;

    for(const key of beforeObjectKeys) if(before[key] !== after[key]) return true;
    return false;
}
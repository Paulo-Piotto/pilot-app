export function objectHasBeenChanged(before, after) {
    const beforeObjectKeys = Object.keys(before);
    const afterObjectKeys = Object.keys(after);
    if(beforeObjectKeys.length !== afterObjectKeys.length) return true;

    for(const key of beforeObjectKeys) if(before[key] !== after[key]) return true;
    return false;
}

export function parseObjectIntoQueryString(obj, first=true) {
    let query = ""

    for(const key in obj) {
        if(typeof obj[key] === "object") query += parseObjectIntoQueryString(obj[key], false)
        else if(!obj[key]) continue
        else query += `${key}=${obj[key]}&`
    }

    if(first) return "?" + query.slice(0, query.length-1);
    console.log("query: ", query)
    return query
}


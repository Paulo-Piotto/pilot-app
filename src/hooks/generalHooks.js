import { useState, useLayoutEffect } from "react";

export function useWindowSize() {
    const [ windowSize, setWindowSize ] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useLayoutEffect(() => {
        function calculateNewScreenSize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        calculateNewScreenSize();

        window.addEventListener('resize', calculateNewScreenSize);

        return () => window.removeEventListener('resize', calculateNewScreenSize)
    }, [])

    return windowSize;
}

export function useLocalStorage() {
    const [ localStorageData, setLocalStorageData ] = useState(JSON.parse(localStorage.getItem("userData")))

    function manageLocalStorageSetter(data) {
        if(data) {
            localStorage.setItem("userData", JSON.stringify(data))
            setLocalStorageData(data)
        }
        else localStorage.removeItem("userData")
    }

    return [ localStorageData, manageLocalStorageSetter ];
}
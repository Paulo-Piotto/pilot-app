import { useState, useLayoutEffect } from "react";

export function useWindowSize() {
    const [ windowSize, setWindowSize ] = useState(window.innerWidth);

    useLayoutEffect(() => {
        function calculateNewScreenSize() { setWindowSize(window.innerWidth) }
        calculateNewScreenSize();

        window.addEventListener('resize', calculateNewScreenSize);

        return () => window.removeEventListener('resize', calculateNewScreenSize)
    }, [])

    return windowSize;
}

export function useLocalStorage() {
    const [ localStorageData, setLocalStorageData ] = useState(localStorage.getItem("userData"))

    function manageLocalStorageSetter(data) {
        localStorage.setItem("userData", data)
        setLocalStorageData(data)
    }

    return [ localStorageData, manageLocalStorageSetter ];
}
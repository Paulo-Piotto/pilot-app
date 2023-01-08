import { useState, useLayoutEffect } from "react";

function useWindowSize() {
    const [ windowSize, setWindowSize ] = useState(window.innerWidth);

    useLayoutEffect(() => {
        function calculateNewScreenSize() {
            setWindowSize(window.innerWidth)
        }

        calculateNewScreenSize();

        window.addEventListener('resize', calculateNewScreenSize);

        return () => window.removeEventListener('resize', calculateNewScreenSize)
    }, [])

    return windowSize;
}

export default useWindowSize;
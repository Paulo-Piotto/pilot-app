import { useState, useEffect } from "react";

function useWindowSize() {
    const [ windowSize, setWindowSize ] = useState(window.innerWidth);

    useEffect(() => {
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
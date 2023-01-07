import { useState, useEffect } from "react";

function useWindowSize() {
    const [ windowSize, setWindowSize ] = useState(window.innerWidth);

    useEffect(() => {
        function calculateNewAnimationBoundarie() {
            setWindowSize(window.innerWidth)
        }

        calculateNewAnimationBoundarie();

        window.addEventListener('resize', calculateNewAnimationBoundarie);

        return () => window.removeEventListener('resize', calculateNewAnimationBoundarie)
    }, [])

    return windowSize;
}

export default useWindowSize;
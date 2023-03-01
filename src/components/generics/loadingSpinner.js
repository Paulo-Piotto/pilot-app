import Lottie from "lottie-react";
import loadingSpinnerAnimation from "../../assets/loading_spinner.json"

export default function LoadingSpinner() {
    return <Lottie 
        animationData={loadingSpinnerAnimation}
    />
}
import UpperSection from "./UpperSection";
import Displayer from "./Displayer";
import PunchCardContext from "../context/PunchCardContext";
import { useContext } from "react";
import RegisterSnackbar from "../generics/registerSnackbar";

export default function PunchCardManager() {
    const { snackBar } = useContext(PunchCardContext)

    return (
        <>
            <UpperSection />
            <Displayer />
            <RegisterSnackbar snackbar={snackBar.isOpen} setSnackbar={snackBar.setter} type={snackBar.type} message={snackBar.message} />
        </>
    )
}
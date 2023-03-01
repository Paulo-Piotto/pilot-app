import UpperSection from "./UpperSection";
import Displayer from "./Displayer";
import PunchCardContext from "../context/PunchCardContext";
import { useContext } from "react";
import GenericSnackbar from "../generics/genericSnackbar";

export default function PunchCardManager() {
    const { snackBar } = useContext(PunchCardContext)

    return (
        <>
            <UpperSection />
            <Displayer />
            <GenericSnackbar snackbar={snackBar.isOpen} setSnackbar={snackBar.setter} type={snackBar.type} message={snackBar.message} />
        </>
    )
}
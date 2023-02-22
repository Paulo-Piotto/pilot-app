import { PunchCardContextProvider } from "../components/context/PunchCardContext";
import PunchCardManager from "../components/punchCardManager";

export default function PunchCardPage() {
    return (
        <PunchCardContextProvider>
            <PunchCardManager />
        </PunchCardContextProvider>
    )
}
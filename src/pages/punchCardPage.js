import { PunchCardContextProvider } from "../components/context/PunchCardContext";
import PunchCard from "../components/punchCard";

export default function PunchCardPage() {
    return (
        <PunchCardContextProvider>
            <PunchCard />
        </PunchCardContextProvider>
    )
}
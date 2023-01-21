import { NavigatorContainer } from "./styles"
import dayjs from "dayjs"
import AuthContext from "../context/AuthContext"
import { useContext } from "react"

export default function Navigator() {
    const { userData } = useContext(AuthContext)

    return (
        <NavigatorContainer>
            <header>
                <h1>{`${userData.name.split(" ")[0]} - ${userData.role}`}</h1>
                <p>{`${dayjs().format("DD/MM/YYYY")}`}</p>
            </header>
            <nav>
                <ul>
                    <li>oie </li>
                    <li>oie 2</li>
                </ul>
            </nav>
        </NavigatorContainer>
    )
}
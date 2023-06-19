import { MainContentContainer } from "./styles"
import ClientsFilter from "./ClientsFilter"
import ExpanderMenu from "./ExpanderMenu"

export default function Displayer() {

    return (
        <MainContentContainer>
            <section id="client_section" >
                <ClientsFilter />
            </section>

            <section id="expander_section">
                <ExpanderMenu  />
            </section>
        </MainContentContainer>
    )
}
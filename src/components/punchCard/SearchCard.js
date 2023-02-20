import { Grow } from "@mui/material"
import { CardStyle } from "../../styles/cardStyles"

export default function SearchCard({contrast, subtitle, searchString, iconName, action, width}) {
    return (
        <Grow in={true} timeout={{ enter: 500, exit: 500 }} style={{ transitionDelay: '0s' }}>
            <CardStyle contrast={contrast} onClick={action} width={width}>
                <section>
                    <p>{subtitle}</p>
                    <input
                        value={searchString}
                        placeholder={searchString}
                    />
                </section>
                <div>
                    <ion-icon name={iconName}></ion-icon>
                </div>
            </CardStyle>
        </Grow>
    )
}
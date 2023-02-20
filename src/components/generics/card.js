import { CardStyle } from "../../styles/cardStyles";
import { Grow } from "@material-ui/core";

export default function Card({contrast, subtitle, title, iconName, number, action, money, width}){
    return(
        <Grow in={true} timeout={{ enter: 500, exit: 500 }} style={{ transitionDelay: '0s' }}>
            <CardStyle contrast={contrast} onClick={action} width={width}>
                {!contrast ? (
                    <>
                    <section>
                        <p>{subtitle}</p>
                        <h2>{title}</h2>
                    </section>
                    <div>
                        <ion-icon name={iconName}></ion-icon>
                    </div>
                    </>
                    
                ) : (
                    <section>
                        <h4>{subtitle}</h4>
                        <h3>{money ? 'R$' : ''} {number}</h3>
                    </section>
                )}
            </CardStyle>
        </Grow>
    );
}
import { CardStyle } from "../../styles/cardStyles";

export default function Card({contrast, subtitle, title, iconName, number, action, money}){
    return(
        <CardStyle contrast={contrast} onClick={action} >
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
    );
}
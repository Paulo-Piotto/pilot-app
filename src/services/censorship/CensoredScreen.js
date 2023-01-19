import * as sc from "./styles"
import Lottie from "lottie-react"
import lockPasteAnimation from "../../assets/lock-paste-animation.json"


export default function CensoredScreen() {
    return (
        <sc.CensoredScreenContainer>
            <h1>Você não tem permissão para acessar esse recurso</h1>
            <h2>Um administrador precisa liberar seu acesso</h2>

            <div id="unauthorized_resource_animation_container">
                <Lottie 
                    animationData={lockPasteAnimation}
                    loop={false}
                    autoplay={true}
                />
            </div>
        </sc.CensoredScreenContainer>
    )
}

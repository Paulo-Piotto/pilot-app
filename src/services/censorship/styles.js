import styled from "styled-components";
import { Container } from "../../components/generics/inProgress";

export const CensoredScreenContainer = styled(Container)`

    display: grid;
    align-items: center;
    padding: 20px;
    border-radius: 15px;

    h1 {
        text-align: center;
        font-size: 1.15rem;
    }

    h2 {
        text-align: center;
        font-size: 1.05rem;
        margin-bottom: 10px;
    }

    #unauthorized_resource_animation_container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        >div {
            max-width: 200px;
        }
    }
`
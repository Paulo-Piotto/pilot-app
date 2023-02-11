import styled from "styled-components";

export const ToolContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 35px;
    height: inherit;
    width: calc(100% - 220px);
    padding: 40px 40px 80px 40px;
    overflow-y: ${props => props.isPanelActive ? "scroll" : "hidden"};
`
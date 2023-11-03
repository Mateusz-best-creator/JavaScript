import styled from "styled-components";

export const DirectoryContainer = styled.div`
    width: 100%; 
    display: flex; 
    flex-wrap: wrap; 
    justify-content: space-between;

    @media (max-width: 850px) {
        display: flex; 
        flex-direction: column;
        justify-content: center;
        height: 1100px;
    }
`

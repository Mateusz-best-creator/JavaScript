import styled from "styled-components";

export const PreviewContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    margin-bottom: 30px; 
`

export const Title = styled.span`
    font-size: 28px; 
    margin-bottom: 25px; 
    cursor: pointer; 
`   
 
export const PreviewFourItems = styled.div`
    display: grid; 
    grid-template-columns: repeat(5, 1fr); 
    column-gap: 20px; 

    @media  (max-width: 1300px) {
       display: grid; 
       grid-template-columns: repeat(4, 1fr); 
       column-gap: 20px;
       row-gap: 30px;
    }

    @media  (max-width: 1000px) {
       display: grid; 
       grid-template-columns: repeat(2, 1fr); 
       column-gap: 20px;
       row-gap: 30px;
    }
    @media  (max-width: 500px) {
       display: grid; 
       grid-template-columns: repeat(1, 1fr); 
       row-gap: 15px;
       column-gap: 20px;
    }
`
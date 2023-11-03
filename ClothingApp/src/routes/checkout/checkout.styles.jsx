import styled from "styled-components";

export const Header = styled.div`
    width: 100%; 
    padding: 10px 0; 
    display: flex; 
    justify-content: space-between; 
    border-bottom: 1px solid darkgrey; 
`
 
export const HeaderBlock = styled.div`
    text-transform: capitalize; 
    width: 23%;
`   

export const LastHeader = styled.div`
    width: 8%; 

    @media (max-width: 450px) {
        margin-right: 5px;
    }
`
export const TotalSum = styled.span`
    margin-top: 30px; 
    margin-left: auto; 
    font-size: 36px; 
`
       
export const CheckoutContainer = styled.div`
    width: 55%; 
    min-height: 90vh; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    margin: 50px auto 0;

    @media only screen and (max-width: 1100px) {
        width: 65%;
    }

    @media only screen and (max-width: 800px) {
        width: 95%;
        ${HeaderBlock} {
            font-size: 0.8rem;
        }
        ${LastHeader} {
            font-size: 0.8rem;
        }
    }
`
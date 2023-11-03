import styled from "styled-components";
import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 95%;
    
`

export const FormContainer = styled.form`
    height: 220px;
    width: 500px;
    max-width: 95%;
`

export const PaymentButton = styled(Button)`
    margin-left: auto;
    margin-top: 30px;
`
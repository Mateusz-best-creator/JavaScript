import styled from "styled-components";

import { ReactComponent as ShoppingSvg } from '../../assets/shopping-bag.svg';

export const ShoppingIcon = styled(ShoppingSvg) `
    width: 24px;
    height: 24px;
`

export const ShoppingIconContainer = styled.div`
    width: 45px; 
    height: 45px; 
    position: relative; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    cursor: pointer; 
`

export const Counter = styled.span`
    position: absolute; 
    font-size: 15px; 
    font-weight: 800; 
    bottom: 10px;
`
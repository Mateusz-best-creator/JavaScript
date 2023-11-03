import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
`

export const LogoContainer = styled(Link)`
     padding: 25px;

`

export const NavLinksContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;
    height: 100%;
    justify-content: flex-end;

    @media (max-width: 450px) {
        width: 80%;
    }
`

export const NavLink = styled(Link)`
    padding: 0.8rem;
    cursor: pointer;

    @media (max-width: 450px) {
        font-size: 0.9rem;
    }
`   
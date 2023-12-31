import { Outlet } from 'react-router-dom';
import React, { Fragment } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
// firebase sign out method
import { signOutUser } from '../../utils/firebase/firebase.utils'; 

// import './navigation.styles.scss';
import {
  NavigationContainer,
  NavLinksContainer,
  NavLink,
  LogoContainer,
} from './navigation.styles';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
  
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
          <LogoContainer to='/'>
            <CrownLogo className='logo' />
          </LogoContainer>
          <NavLinksContainer>
            <NavLink to='/shop'>SHOP</NavLink>
            { currentUser  
              ? <NavLink as='span' onClick={() => signOutUser()}>
                  SIGN OUT
                </NavLink> 
              : <NavLink to='/auth'>SIGN IN</NavLink>
            }
            <div>
              <CartIcon />
            </div>
          </NavLinksContainer>
          {
            isCartOpen ? <CartDropdown /> : ''
          }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;
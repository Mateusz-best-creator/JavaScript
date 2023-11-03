import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux'
import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentical.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.routes';
import { setCurrentUser } from './store/user/user.reducer';

// firebase utils
import { 
  createUserDocumentFromAuth, 
  onAuthStateChangedListener,
} from './utils/firebase/firebase.utils';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    })

    return unsubscribe;
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={ <Navigation /> }>
        <Route index={true}  element={ <Home /> } />
        <Route path='shop/*' element={ <Shop /> } />
        <Route path='auth' element={ <Authentication /> } />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App;

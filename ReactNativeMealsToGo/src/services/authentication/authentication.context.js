import React, {useState, createContext, useEffect} from "react";

// firebase helper methods
import { 
    createAuthUserWithEmailAndPassoword,
    onAuthStateChangedListener,
    signInUser,
    createUserDocumentFromAuth,
    signOutUser,
 } from "../firebaseUtils/firebase";

export const AuthenticationContext = createContext({
    isLoading: false,
    setIsLoading: () => null,
    user: null,
    setIsLoading: () => null,
    error: null,
    setError: () => null,
});

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [appUser, setAppUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
          if (user) {
            createUserDocumentFromAuth(user);
          }
          setAppUser(user);
        })
    
        return unsubscribe;
      }, [])

    const onLogin = async (email, password) => {
        try {
            setIsLoading(true);
            const {user} = await signInUser(email, password);
            setAppUser(user);
            // setError(null);
        } catch(error) {
            console.log("ERRRR", error);
            // when we work with firebase and we have an error
            // we want to make it interact as an array so we use toString method!!!
            setError(error.toString());
        }
        setIsLoading(false);
    }

    const onRegister = async(email, password, repeatedPassword) => {
        try{
            setIsLoading(true);
            if(password !== repeatedPassword) {
                setError('Passwords do not match');
                setIsLoading(false);
                return;
            }
            const {user} = await createAuthUserWithEmailAndPassoword(email, password);
            setAppUser(user);
        }catch(error) {
            setError(error.toString());
        }
        setIsLoading(false);
    }

    const onSignOut = async() => {
        await signOutUser()
    }

    value = {appUser, isLoading, error, onLogin, onRegister, onSignOut, isAuthenticated: !!appUser};

    return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}
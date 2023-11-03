import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRJ5IleB8VX2MdtU6_cr4kK_iVfXPB8kk",
  authDomain: "mealstogo-ba2ba.firebaseapp.com",
  projectId: "mealstogo-ba2ba",
  storageBucket: "mealstogo-ba2ba.appspot.com",
  messagingSenderId: "402172355132",
  appId: "1:402172355132:web:c5fd2f20e62a5bd4b91939"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const database = getFirestore();

// create user snapshot and return that snapshot
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {} ) => {
    if (!userAuth) return;
    // We check if there is an existing document reference
    //                  database | collection name | document name
    const userDocRef = doc(database, 'users', userAuth.uid);
    // user snapshot is a pointer where that data live
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const dataCreated = new Date();
        try {
            await setDoc(userDocRef, {
                // now we pass the data we want to set it with
                displayName,
                email,
                dataCreated,
                ...additionalInformation,
            })
        } catch(error) {
            console.log("Error! : ", error);
        }
    }

    return userSnapshot;
}

export const createAuthUserWithEmailAndPassoword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUser = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
    return await signOut(auth);
}

export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback);
}
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    // signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    // Sign out method
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    // retrieve documents inside of our firestore database
    doc,
    // get documents data
    getDoc,
    // set documents data
    setDoc,
    // save differenct categories withi nfirestore database
    collection,
    writeBatch,
    getDocs,
    query,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIWJOOpSA_9RKBVPoywEf860Gbwk2vqRc",
    authDomain: "crown-clothing-app-733b1.firebaseapp.com",
    projectId: "crown-clothing-app-733b1",
    storageBucket: "crown-clothing-app-733b1.appspot.com",
    messagingSenderId: "434563010428",
    appId: "1:434563010428:web:3d48e2c08160b200d89ef9"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, googleProvider);
}

// Database
export const database = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(database, collectionKey);
    // batch allows us deletes, updates, writes, sets
    const batch = writeBatch(database);

    objectsToAdd.forEach((object) => {
        const documentReference = doc(collectionRef, object.title.toLowerCase());
        batch.set(documentReference, object);
    });

    await batch.commit();
    console.log("done");
}

export const getCategoriesAndDocuments = async () => {
    const collectionReference = collection(database, 'categories');
    const q = query(collectionReference);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docsSnapshot) => {
        return docsSnapshot.data();
    })
}

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

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
    return await signOut(auth);
}


export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback)
}
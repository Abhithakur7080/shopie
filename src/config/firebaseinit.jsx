//get all needed react hooks
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//get inititalized database
import { initializeApp } from "firebase/app";
//authentication
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
//firestore database
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
//realtime database
import { getDatabase, set, ref } from "firebase/database";

//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLMPm_fO4yP2t6fRW7YPJ6qmGwn_bG1RU",
  authDomain: "ecommerce-4c1fd.firebaseapp.com",
  projectId: "ecommerce-4c1fd",
  storageBucket: "ecommerce-4c1fd.appspot.com",
  messagingSenderId: "978652412531",
  appId: "1:978652412531:web:16835e411797de43ca0806",
  databaseURL: "https://ecommerce-4c1fd-default-rtdb.firebaseio.com/",
};
// All initialized configuration
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestoreDB = getFirestore(firebaseApp);
const database = getDatabase(firebaseApp);

//initiaize the context API
const FirebaseContext = createContext(null);

//custom hook
export const useFirebase = () => useContext(FirebaseContext);

//context API provider
export const FirebaseProvider = (props) => {
  //get user state
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  //user authentication signup
  const signupUserWithEmailAndPassword = async (email, password) => {
    const userCrediential = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    return userCrediential;
  };
  //user authentication signin
  const loginUserWithEmailAndPassword = async (email, password) => {
    const userCrediential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return userCrediential;
  };
  //user signin with google
  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithRedirect(firebaseAuth, googleProvider);
  };
  const logoutUser = async () => {
    await signOut(firebaseAuth);
  };
  //update authenticated user data
  const updateAuthenticatedUserData = async (updateData) => {
    await updateProfile(firebaseAuth.currentUser, updateData);
  };

  //sent verification on email
  const sentUserEmailVerification = () => {
    sendEmailVerification(firebaseAuth.currentUser)
      .then(() => alert("email verification sent please check"))
      .catch((error) => console.error(error));
  };
  //add/update in realtime database
  const putData = (key, data) => set(ref(database, key), data);

  //add data to firestore collection
  const addDataToFirestore = async (collectionName, data) => {
    await addDoc(collection(firestoreDB, collectionName), data);
  };
  //add/update data to firestore collection with a refernce
  const setDataToFirestoreRef = async (collectionName, reference, data) => {
    await setDoc(doc(firestoreDB, collectionName, reference), data);
  };
  //add/update data to firestore collection with no reference(autogenerated)
  const setDataToFirestoreNoRef = async (collectionName, data) => {
    await setDoc(doc(collection(firestoreDB, collectionName)), data);
  };
  //update data from firestore collection with a reference
  const updateDataFromFirestore = async (collectionName, reference, data) => {
    await updateDoc(doc(firestoreDB, collectionName, reference), data);
  };
  //delete data from firestore collection with a reference
  const deleteDataFromFirestore = async (collectionName, reference) => {
    await deleteDoc(doc(firestoreDB, collectionName, reference));
  };
  //get a document data from firestore collection with a reference
  const getADocsFromFirestore = async (collectionName, reference) => {
    const docSnap = await getDoc(doc(firestoreDB, collectionName, reference));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return "Document doesn't exist!";
    }
  };
  //get multiple document data of a collection using "where" keyword to compare a key value from database
  const getMultipleDocsFromFirestore = async (collectionName, key, value) => {
    let data = [];
    const querySnapshot = await getDocs(
      query(collection(firestoreDB, collectionName), where(key, "==", value))
    );
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  };
  //get all document data of a collection from firebase
  const getAllDocsFromFirestore = async (collectionName) => {
    let data = [];
    const querySnapshot = await getDocs(
      query(collection(firestoreDB, collectionName))
    );
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        console.log("you are logged out");
        setUser(null);
      }
      navigate('/')
    });
  }, []);
  return (
    <FirebaseContext.Provider
      value={{
        //authentication
        signupUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        updateAuthenticatedUserData,
        sentUserEmailVerification,
        signInWithGoogle,
        logoutUser,
        //realtime database
        putData,
        //currentUser
        user,
        //firestore database
        addDataToFirestore,
        setDataToFirestoreRef,
        setDataToFirestoreNoRef,
        updateDataFromFirestore,
        deleteDataFromFirestore,
        getADocsFromFirestore,
        getMultipleDocsFromFirestore,
        getAllDocsFromFirestore,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

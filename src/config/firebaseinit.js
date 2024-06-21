import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set as setDataToRealtimeDatabase,
} from "firebase/database";
import {
  getFirestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  where,
  query,
  setDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  databaseURL: import.meta.env.VITE_APP_DATABASE_URL,
};

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firestoreDB = getFirestore(firebaseApp);
export const database = getDatabase(firebaseApp);

export const useAuth = () => {
  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      if (userCredential) {
        return userCredential;
      }
    } catch (error) {
      if (error.message.includes("email-already-in-use")) {
        toast.error("Email already exists! Please login.");
      }
    }
  };

  const loginUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      if (error.message.includes("invalid-credential")) {
        toast.error("Invalid email/password.");
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      return await signInWithRedirect(firebaseAuth, googleProvider);
    } catch (error) {
      console.log(error);
      return error
    }
    
    
  };

  const logoutUser = async () => {
    await signOut(firebaseAuth);
  };

  const updateAuthenticatedUserData = async (updateData) => {
    await updateProfile(firebaseAuth.currentUser, updateData);
  };

  const sentUserEmailVerification = () => {
    sendEmailVerification(firebaseAuth.currentUser)
      .then(() => alert("Email verification sent. Please check your email."))
      .catch((error) => console.error(error));
  };

  return {
    signupUserWithEmailAndPassword,
    loginUserWithEmailAndPassword,
    signInWithGoogle,
    logoutUser,
    updateAuthenticatedUserData,
    sentUserEmailVerification,
  };
};

export const useRealtimeDatabase = () => {
  const putData = (key, data) =>
    setDataToRealtimeDatabase(ref(database, key), data);
  return {
    putData,
  };
};

export const useFirestore = () => {
  const addDataToFirestore = async (collectionName, data) => {
    await addDoc(collection(firestoreDB, collectionName), data);
  };

  const setDataToFirestoreRef = async (collectionName, reference, data) => {
    await setDoc(doc(firestoreDB, collectionName, reference), data);
  };

  const setDataToFirestoreNoRef = async (collectionName, data) => {
    await setDoc(doc(collection(firestoreDB, collectionName)), data);
  };

  const updateDataFromFirestore = async (collectionName, reference, data) => {
    await updateDoc(doc(firestoreDB, collectionName, reference), data);
  };

  const deleteDataFromFirestore = async (collectionName, reference) => {
    await deleteDoc(doc(firestoreDB, collectionName, reference));
  };

  const getADocsFromFirestore = async (collectionName, reference) => {
    const docSnap = await getDoc(doc(firestoreDB, collectionName, reference));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // return "Document doesn't exist!";
      return null;
    }
  };

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

  return {
    addDataToFirestore,
    setDataToFirestoreRef,
    setDataToFirestoreNoRef,
    updateDataFromFirestore,
    deleteDataFromFirestore,
    getADocsFromFirestore,
    getMultipleDocsFromFirestore,
    getAllDocsFromFirestore,
  };
};

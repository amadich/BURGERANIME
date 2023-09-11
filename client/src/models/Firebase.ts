import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth"; // Import necessary functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Set persistence to session (keeps the user logged in)
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // This is an asynchronous operation, so you can proceed with authentication
    // after setting persistence.
    signInWithEmailAndPassword(auth, import.meta.env.VITE_emailauthbase , import.meta.env.VITE_pwdauthbase);
   
  })
  .catch((error) => {
    // Handle errors related to setting persistence
    console.error("Error setting persistence:", error);
  });

export default app; // Optionally, you can export the entire Firebase app instance.

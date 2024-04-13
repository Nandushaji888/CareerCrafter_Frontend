// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_FIREBASE_APP_ID;

// const firebaseConfig = {
//   apiKey: "AIzaSyCq7VjKO1qKjY8klikZRnCLqTOO25yhqwQ",
//   authDomain: "careercrafterauth.firebaseapp.com",
//   projectId: "careercrafterauth",
//   storageBucket: "careercrafterauth.appspot.com",
//   messagingSenderId: "583603023948",
//   appId: "1:583603023948:web:953c64154d70d20761c4e9"
// };

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId:projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId:appId 
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)
// const provider = new GoogleAuthProvider()

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

// export {
//   auth,
//   provider
// }
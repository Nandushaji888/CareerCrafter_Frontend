// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCq7VjKO1qKjY8klikZRnCLqTOO25yhqwQ",
  authDomain: "careercrafterauth.firebaseapp.com",
  projectId: "careercrafterauth",
  storageBucket: "careercrafterauth.appspot.com",
  messagingSenderId: "583603023948",
  appId: "1:583603023948:web:953c64154d70d20761c4e9"
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
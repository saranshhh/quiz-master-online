// // import { initializeApp } from "firebase/app";

// // const app = initializeApp({
// //   apiKey: process.env.local.REACT_APP_FIREBASE_API_KEY,
// //   authDomain: process.env.local.REACT_APP_FIREBASE_AUTH_DOMAIN,
// //   projectId: process.env.local.REACT_APP_FIREBASE_PROJECT_ID,
// //   storageBucket: process.env.local.REACT_APP_FIREBASE_STORAGE_BUCKET,
// //   messagingSenderId: process.env.local.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
// //   appId: process.env.local.REACT_APP_FIREBASE_APP_ID,
// // });

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD0xlr8dzKf6UjfuuSDgOcbovsriel0FQQ",
//   authDomain: "auth-development-1bc81.firebaseapp.com",
//   projectId: "auth-development-1bc81",
//   storageBucket: "auth-development-1bc81.appspot.com",
//   messagingSenderId: "347364385471",
//   appId: "1:347364385471:web:be0c9eb70dc6875b06dc0a",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth();
// export const db = getFirestore(app);

// export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqYIE7QS40QfbEBjyWHWkyuQeeYg1Geoc",
  authDomain: "leaderboard-23102.firebaseapp.com",
  projectId: "leaderboard-23102",
  storageBucket: "leaderboard-23102.appspot.com",
  messagingSenderId: "166139134245",
  appId: "1:166139134245:web:7558741dbf9deb221c9acc",
  measurementId: "G-SGS0FXCVBJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export default app;

// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1QNOcuW113ZB1La1mBLntdZGegJrZE2I",
  authDomain: "fitness-app-c09df.firebaseapp.com",
  projectId: "fitness-app-c09df",
  storageBucket: "fitness-app-c09df.appspot.com",
  messagingSenderId: "344444845178",
  appId: "1:344444845178:web:78f999af96db8cfb464fc3"
};

let auth;

if (!getApps().length) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} else {
  auth = getAuth();
}

export default auth;

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDmY2AlnGOHPGMUV52B2b21KQAsoJRuaX4",
  authDomain: "ecommercy-b886e.firebaseapp.com",
  projectId: "ecommercy-b886e",
  storageBucket: "ecommercy-b886e.appspot.com",
  messagingSenderId: "1041702104749",
  appId: "1:1041702104749:web:47797c5bd81a69426ca024",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app

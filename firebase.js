import firebase from 'firebase/compat/app'
import "firebase/compat/database"
import 'firebase/storage'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
import 'firebase/compat/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAh10nCpXsd57vr5VMLZp4LJYXx8RWZUQo",
  authDomain: "altokudos-60cbb.firebaseapp.com",
  databaseURL: "https://altokudos-60cbb-default-rtdb.firebaseio.com",
  projectId: "altokudos-60cbb",
  storageBucket: "altokudos-60cbb.appspot.com",
  messagingSenderId: "9924737100",
  appId: "1:9924737100:web:a094b426ede81a000e9ce9",
  measurementId: "G-0B5F0G7CCB"
};

// Initialize Firebase
/*
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const ex=[app.database.ref(), analytics]
export default ex
*/

const fb=firebase.initializeApp(firebaseConfig)
const storage=getStorage(fb)
const auth=getAuth(fb)
const fs=getFirestore(fb)
const ex=[fb.database().ref(), storage, auth, fb]
export default ex
import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBT_qKd2IlLocqrGGmsn7oytvpZIcE1huU",
    authDomain: "fir-eb5b4.firebaseapp.com",
    projectId: "fir-eb5b4",
    storageBucket: "fir-eb5b4.appspot.com",
    messagingSenderId: "116400676175",
    appId: "1:116400676175:web:adf74688519f731676b93a",
    measurementId: "G-5MRQRFKS9Z"
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
} else {
    getApps();
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
   

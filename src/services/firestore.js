import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize database
const firebaseConfig = {
    apiKey: 'AIzaSyA3vh9VqlkPZfTEosvvRnTb8EW80A5aDGo',
    authDomain: 'kasoot-1920c.firebaseapp.com',
    projectId: 'kasoot-1920c',
    databaseURL: 'https://kasoot-1920c.firebaseio.com',
    storageBucket: 'kasoot-1920c.appspot.com',
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
else {
    firebase.app()
}

const db = firebase.firestore()

export const getShoe = (shoeID) => {
    return db.collection("shoes").doc(shoeID)
}

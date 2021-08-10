import * as firebase from "firebase/app";
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
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export const getShoesQuery = (searchTerm) => {
    return db.collection('shoes').where("prodName", "array-contains", searchTerm).get()
}

export const getShoe = (shoeID) => {
    return db.collection('shoes').doc(shoeID).get()
}

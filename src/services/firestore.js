import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Alert } from "react-native";

// Initialize database
const firebaseConfig = {
    apiKey: "AIzaSyDxmvZqsM1nmUqoSWEp4WVSkAP2S6HjWYM",
    authDomain: "kasoot-remake.firebaseapp.com",
    projectId: "kasoot-remake",
    storageBucket: "kasoot-remake.appspot.com",
    messagingSenderId: "748655436766",
    appId: "1:748655436766:web:aa29d0ba7a3f814ec8b34f"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
else {
    firebase.app()
}

const db = firebase.firestore()

export const getAllShoes = () => {
    return db.collection("shoes").get()
}

export const getShoeByCat = (category) => {
    return db.collection("shoes").where("prodCat", "==", category).get()
}

export const getOtherShoes = () => {
    return db.collection("shoes").where("prodCat", "not-in", ["Sneakers", "Slippers"]).get()
}

export const getShoe = (shoeID) => {
    return db.collection("shoes").doc(shoeID)
}

export const getShoesByID = (shoeIDArr) => {
    return db.collection("shoes").where("id", "in", shoeIDArr).get()
}

export const getWishlist = (uid) => {
    return db.collection("wishlist").doc(uid)
}

export const addToWishlist = async (uid, prodID) => {
    const response = await getWishlist(uid)

    try {
        response.update({
            products: firebase.firestore.FieldValue.arrayUnion(prodID)
        });
    } catch(err) {
        console.error(err)
    }
}

export const removeFromWishlist = async (uid, prodID) => {
    const response = await getWishlist(uid)

    try {
        response.update({
            products: firebase.firestore.FieldValue.arrayRemove(prodID)
        });
    } catch(err) {
        console.error(err)
    }
}

export const getCart = (uid) => {
    return db.collection("cart").doc(uid)
}

export const addToCart = async (uid, newCart) => {
    const response = await getCart(uid)

    try {
        response.update({
            cart: firebase.firestore.FieldValue.arrayUnion(newCart)
        })
    } catch(err) {
        console.error(err)
    }
}

export const addToCartDup = async (uid, newCart) => {
    const response = await getCart(uid)

    try {
        response.set({
            cart: newCart
        })
    } catch(err) {
        console.error(err)
    }
}

export const deleteCart = async (uid) => {
    await db.collection("cart").doc(uid).update({
        cart: firebase.firestore.FieldValue.delete()
    })
}

// Account - Login
export async function signIn (email, password)  {
    
    try{
        await firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(function (user) {
                console.log(user)   // Log USER obj to console
            })
        } catch(e) {
            alert("Incorrect Email or Password!")
            console.log("Login FAILED: " + e.message)
        }
}

// Account - Register
export async function signUp (email, password) {

    try {
        await firebase.auth()
            .createUserWithEmailAndPassword(email, password)
                .then(function (user) {
                console.log(user)   //Log USER obj to console

                // Create a new cart document for the new user
                db.collection("cart").doc(user.user.uid).set({
                    cart: []
                })

                // Create a new wishlist document for the new user
                db.collection("wishlist").doc(user.user.uid).set({
                    products: []
                })
            })
    } catch (e) {
        
        if (e.code === 'auth/email-already-in-use') {
            alert("The email address is already in use by another account.")
            console.log("Register FAILED: " + e.message)
        }

        if (e.code === 'auth/invalid-email') {
            alert("Please enter a valid email for register!")
            console.log("Register FAILED: " + e.message)
        }
    }
}

// Account - Logout
export async function signOut() {
    try {
        await firebase.auth().signOut();
        Alert.alert(
            "",
            "Successfully Logged Out!",
            [
                {
                    text: "OK",
                    onPress: () => console.log("AlertBox: Logout Button Pressed & Sucessful perform LOGOUT")
                }
            ],
            {cancelable: true}
        )
    } catch (e) {
        console.log("Logout FAILED: " + e.message)
    }
}

// Account - Get Current User's EMAIL
export function getUserEmail() {
    try {
        return (firebase.auth().currentUser.email)
    } catch (e) {
    }
}

// Account - Get Current User's UID
export function getUserID() {
    try {
        return (firebase.auth().currentUser.uid)
    } catch (e) {
    }
}

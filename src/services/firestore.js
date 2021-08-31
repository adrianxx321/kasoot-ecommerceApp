import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { RecyclerViewBackedScrollView, Alert } from "react-native";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import ProfileScreen from "../screens/Acc_ProfileScreen";

// Initialize database
const firebaseConfig = {
    apiKey: 'AIzaSyA3vh9VqlkPZfTEosvvRnTb8EW80A5aDGo',
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCnCILZfQqkSNdC\nKjd+u2FPoQM9TT0suX7u00Q6t8Mhtl15EpDdbaMV9l0Qv05WDnDapjWLwjc6RZB4\nyYhc6rcWmZ0XhQxX8LpLe+zEk8QgV8iBE0v4keIbszqaNbiseyLvovlUl1QiP37T\nM+udcdEIWIOjcj1bNf7WK8qtVP784LFveULqjq00Z4Q4V+RKahnMnKqY/ILvjnHa\nmzmE+JzdLpwWlGAqxtMB2AqPGfLv8ZKAfi5EvXASuXkGgNnyn9He4PpbwefpAPMz\nsCLlG67XsILaUmGiDFWTS4BDGNSC//yUiT2Gx+5TkSJPGLP7q5rwU+4OCquchSl4\nx/Bg2Xr7AgMBAAECgf9H/S2ym1FPNI0DcX23frKGHh2hbHWUyHSwTRsDYqGAg/fb\nGCXtx28M0Z4IFlI6mkAmGinHRE00PKN+V/CFE1cYHraHhlOsA6WtMgA/KWvilwHQ\nkdKZ/1cdbYc56HzjjeCIOaJp7dkcJnU3eGVim23Rg/jHvBF+hMeYIcAfwcsZt4tP\n5u3ryTprtldLF2rcRXV2p1IaAEsq6gqNzSkXkPV5ZZoFNIUTPW2T4VZIZ2mMJGif\ne5edFaBJTf449i/qz1WVcM67tPKzy5/K4WDJJ9iZLzUdvFW2v+wF/4Fq/fW1TJNh\npMCd12Vht0/1pbBDT7ps1w2vHwtl9q+FoxTm6vECgYEA4I05vjwuEZAtDeXvOo3N\nHHW0rhjlwcrBi/ElqChVnyw8pmb5cCRvwj0JGdI2q3kdhKdkz5n/KsOFwYvhaLmD\nY+0QQ3+7GRjyTk6/l4PQHTce/uqgTyMIxntawOzWIRFl8wUScHCV9pKYEdRZUHLX\ndt2bWBDhhS4+GbaETnF3YYsCgYEAvm0Y7IdoEgIcp4XO5g9NiGX8pVzjJCBhRv5A\n+XZrJ/mreYGzdN2LXK1mk8eGJGoku/5cLtjzdvVHk26AoWl9I6cctkTMfFKRySCS\nycf3tB3vf3ueVC2EKXkGJRdVfpI6YSDFRN/w9jtsuWrS1F4Xg/7h38jowvGDQqUI\nbdzymlECgYEAhjrlsZo3z7fnts8kWlQ5sDGMeCXZ8iZJ3GWipQq3ZBcFilMz+J1P\nUUU7E3xdwdL8mjeWQ6NCrUWDx1bev8Nlj24+sprANRh8f+MDFIdu+Ifit295tNS0\ngjFq5risp8fGsabuhthGTMcEsGPHoBeGRT/jhJlStlIWPTiljl61hlECgYBR3nWo\nu05y75WCMHUTU+Dxk2dbcOP21DT+YLFujwri1OR0CN8uj1ErNyGyx0VUwo2ohWL8\ngSmrKyjqqceDnea/PUmK02lWyekDn418Uwyb04L0PCGF70uyyOVrbOzEzflraLtn\nMSBXvJSx4stholJZ3Wse2zG3Hj5gmLNXCHcFAQKBgGf3Y9qJqH6JXUDxm43HOShY\nnnsLA9T4hKj1zFVVMN9Dm1k3sJKSJfof/WPovcAX3a6lUL+4q0IOCaOX3Z69q13S\nbEVwKnrrkVgkxzKHVBT1wiEU4BZAwccwR1GiRnAj3+2FLOxW6MziYiVXi1fkodUe\nCc8giMj7QqZjmFmt6k7u\n-----END PRIVATE KEY-----\n",
    authDomain: 'kasoot-1920c.firebaseapp.com',
    projectId: 'kasoot-1920c',
    databaseURL: 'https://kasoot-1920c.firebaseio.com',
    storageBucket: 'kasoot-1920c.appspot.com',
}
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

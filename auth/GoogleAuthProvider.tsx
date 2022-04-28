import { auth } from "../firebase";
import firebase from "firebase/";
import { GoogleAuthProvider } from "@firebase/auth-types";
import { db } from "../firebase";

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    firebase.auth().signInWithPopup(googleProvider)
     .then((res) => {
        const uid = auth.currentUser.uid
        const userRef = db.collection('user').doc(uid)
        userRef.set({
          likePostCount: 0
        })
     })
     .catch((error) => {
         console.log(error.message);
     });

     return (
        <div>
          <button onClick = {signInWithGoogle} >Googleでログイン</button>
        </div>
     );
};


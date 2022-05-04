import firebase from "firebase";
import { db } from "../firebase";
import { auth } from "../firebase";

export const Twitter = new firebase.auth.TwitterAuthProvider();

export const signInWithTwitter = () => {
  firebase
    .auth()
    .signInWithPopup(Twitter)
    .then((res) => {
      const uid = auth.currentUser.uid;
      const userRef = db.collection("user").doc(uid);
      userRef.set({
        likePostCount: 0,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });

  return (
    <div>
      <button onClick={signInWithTwitter}>Twitterでログイン</button>
    </div>
  );
};

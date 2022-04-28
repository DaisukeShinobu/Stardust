import React from "react";
import { auth, db } from "../../firebase";
import firebase from "firebase";

const uid = auth.currentUser.uid;
const userRef = db.collection("user").doc(uid);
const postRef = userRef.collection("posts").doc();
export const addLikeBatch = db.batch();
export const deleteLikeBatch = db.batch();

addLikeBatch.set(
  db.doc(postRef.path).collection("likedUsers").doc(userRef.id),
  {
    id: userRef.id,
    createTime: firebase.firestore.FieldValue.serverTimestamp(),
  }
);
addLikeBatch.set(
  db.doc(userRef.path).collection("likedPosts").doc(postRef.id),
  {
    id: postRef.id,
    postRef: postRef,
    createTime: firebase.firestore.FieldValue.serverTimestamp(),
  }
);

await addLikeBatch.commit();

// 削除

deleteLikeBatch.delete(
  db.doc(postRef.path).collection("likedUsers").doc(userRef.id)
);

deleteLikeBatch.delete(
  db.doc(userRef.path).collection("likedPosts").doc(postRef.id)
);

await deleteLikeBatch.commit();

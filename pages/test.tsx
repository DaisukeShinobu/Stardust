import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import { db } from "../firebase";
import { AuthProvider } from "../auth/AuthProvider";
import ResponsiveAppBar from "../component/Header";
import { LabelBottomNavigation } from "../component/Footer";

const FirestoreData = () => {
  const [lyrics, setLyrics] = useState([
    { Lyric: "", Artist: "", Title: "", URL: "", id: "", Tags: [], Author: "" },
  ]);

  const fetch = () => {
    const DetailData = db
      .collectionGroup("posts")
      .onSnapshot((snapshot) => {
        console.log(snapshot)
        setLyrics(
          snapshot.docs.map((doc) => ({
            Lyric: doc.data().Lyric,
            Artist: doc.data().Artist,
            Title: doc.data().Title,
            URL: doc.data().youtubeURL,
            Tags: doc.data().tags,
            Author: doc.data().author,
            id: doc.id,
          }))
        );
        console.log(lyrics)
      });
  };
  return <div>aaaaaaaa</div>;
};

export default FirestoreData;

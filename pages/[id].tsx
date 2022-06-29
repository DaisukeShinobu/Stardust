import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import { db } from "../firebase";
import Posts from "../component/Timeline/posts";
import { AuthProvider } from "../auth/AuthProvider";
import ResponsiveAppBar from "../component/Header";
import ShareButton from "../component/share/sharebutton";
import {Footer2} from "../component/footer2";


type PostsType = {
  Lyric: string;
  Artist: string;
  Title: string;
  URL: string;
  postid: string;
  Tags: string[];
  Author: string;
};

const FirestoreData = () => {
  const router = useRouter();
  const param = router.query;
  const [lyrics, setLyrics] = useState([
    {
      Lyric: "",
      Artist: "",
      Title: "",
      URL: "",
      postid: "",
      Tags: [],
      Author: "",
    },
  ]);

  const fetch = () => {
    if (param.id) {
      const DetailData = db
        .collectionGroup("posts")
        .where("postid", "==", param.id);
      DetailData.get().then((data) => {
        setLyrics(
          data.docs.map((doc) => ({
            Lyric: doc.data().Lyric,
            Artist: doc.data().Artist,
            Title: doc.data().Title,
            URL: doc.data().youtubeURL,
            Tags: doc.data().tags,
            Author: doc.data().author,
            postid: doc.id,
          }))
        );
        console.log(lyrics);
      });
    }
  };
  useEffect(() => {
    fetch();
  }, [param.id]);

  return (
    <AuthProvider>
      <div>
        <ResponsiveAppBar />
        {lyrics &&
          lyrics.map((data) => (
            <Posts
              key={data.postid}
              id={data.postid}
              Title={data.Title}
              Lyric={data.Lyric}
              Artist={data.Artist}
              Tags={data.Tags}
              Author={data.Author}
              URL={data.URL}
            />
          ))}
        <Footer2 />
      </div>
    </AuthProvider>
  );
};

export default FirestoreData;

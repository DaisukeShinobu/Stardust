import React, { useState, useEffect, useContext } from "react";
import { AuthProvider } from "../auth/AuthProvider";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { LabelBottomNavigation } from "../component/Footer";
import Posts from "../component/Timeline/Posts";
import ResponsiveAppBar from "../component/Header";


const Home: React.FC = (props) => {
  const router = useRouter();
  const [lyrics, setLyrics] = useState([
    { Lyric: "", Artist: "", Title: "", URL: "", id: "", Tags: [], Author: "" },
  ]);

  useEffect(() => {
    const loginJudge = auth.onAuthStateChanged((user) => {
      !user && router.push("/");
    });
    return () => loginJudge();
  });

  useEffect(() => {
    const unSub = db.collectionGroup("posts").onSnapshot((snapshot) => {
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
    return () => {
      
      unSub();
    };
  }, []);

  return (
    <AuthProvider>
      <div>
        <ResponsiveAppBar />
        {lyrics.map((data) => (
          <Posts
            key={data.id}
            id={data.id}
            Title={data.Title}
            Lyric={data.Lyric}
            Artist={data.Artist}
            Tags={data.Tags}
            Author={data.Author}
            URL={data.URL}
          />
        ))}
        <LabelBottomNavigation />
      </div>
    </AuthProvider>
  );
};

export default Home;

import React, { useState, useEffect, useContext } from "react";
import { AuthProvider } from "../auth/AuthProvider";
import { auth, db } from "../firebase";
import { useRouter } from "next/router";
import { BasicTabs } from "../component/Header";
import { LabelBottomNavigation } from "../component/Footer";
import Posts from "../component/Timeline/Posts";

const Home: React.FC = (props) => {
  const router = useRouter();
  const [lyrics, setLyrics] = useState([
    { Lyric: "", Artist: "", Title: "", URL: "", id: "" },
  ]);

  useEffect(() => {
    const loginJudge = auth.onAuthStateChanged((user) => {
      !user && router.push("/");
    });
    return () => loginJudge();
  });

  useEffect(() => {
    const unSub = db.collection("post").onSnapshot((snapshot) => {
      setLyrics(
        snapshot.docs.map((doc) => ({
          Lyric: doc.data().Lyric,
          Artist: doc.data().Artist,
          Title: doc.data().Title,
          URL: doc.data().URL,
          id: doc.id,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <AuthProvider>
      <div>
        <BasicTabs></BasicTabs>
        {lyrics.map((data) => (
          <Posts
            key={data.id}
            id={data.id}
            Title={data.Title}
            Lyric={data.Lyric}
            Artist={data.Artist}
            URL={data.URL}
          />
        ))}
        <LabelBottomNavigation></LabelBottomNavigation>
      </div>
    </AuthProvider>
  );
};

export default Home;

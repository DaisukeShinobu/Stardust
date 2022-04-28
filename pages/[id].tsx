import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import { db } from "../firebase";

const FirestoreData = () => {
  type dataType = {
    Lyric: string;
    Artist: string;
    Title: string;
    URL: string;
    Tags: string[];
    Author: string;
    id: string;
  };
  const [data, setData] = useState<dataType>({
    Lyric: "",
    Artist: "",
    Title: "",
    URL: "",
    id: "",
    Tags: [],
    Author: ""
  });
  const router = useRouter();
  const param = router.query;

  const fetch = async () => {
    const firestoreData = await db.collectionGroup("posts").where("id", "==", `${param.id}`).get();
    const res = firestoreData.docs;
    console.log(res);
    if (res) {
      setData({
        ...data,
        Lyric: res.Lyric,
        Artist: res.Artist,
        Title: res.Title,
        URL: res.youtubeURL,
        Tags: res.Tags,
        Author: res.Author
      });
    }
  };
  useEffect(() => {
    fetch();
  }, [param.id]);

  return (
    <p>
      {param.id}
      {data.Title}
      {data.Artist}
      {data.Lyric}
      {data.URL}
      {data.Tags}
    </p>
  );
};

export default FirestoreData;

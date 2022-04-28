import React from "react";
import { useState, useEffect } from "react";
import { db } from "../../firebase";

const GetTags = (props) => {
  const [tags, setTags] = useState([{ id: "", title: "" }]);
  useEffect(() => {
    const TagsInfo = db.collectionGroup("tags").onSnapshot((snapshot) => {
      setTags(
        snapshot.docs.map((doc) => ({
            id: doc.id, title: doc.data().text
          }))
        );
    });
    return () => {
    console.log(tags)
      TagsInfo();
    };
  }, []);

  return (
  <div>
      {tags.map((data) => console.log(data))}
      GetTagsがうまく機能していない
  </div>
  )
};

export default GetTags;

import React, { useState } from "react";
import { db } from "../firebase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { auth } from "../firebase";


type PostsType = {
  Lyric: string;
  Artist: string;
  Title: string;
  URL: string;
};

const initialFormState: PostsType = {
  Lyric: "",
  Artist: "",
  Title: "",
  URL: "",
};

const ObjectStateForm: React.FC = () => {
  const [formState, setFormState] = useState(initialFormState);
  const setState = (value: Partial<PostsType>) => {
    setFormState({
      ...formState,
      ...value,
    });
  };

  const inputCallback = {
    Lyric: (e: React.ChangeEvent<HTMLInputElement>) =>
      setState({ Lyric: e.target.value }),
    Artist: (e: React.ChangeEvent<HTMLInputElement>) =>
      setState({ Artist: e.target.value }),
    Title: (e: React.ChangeEvent<HTMLInputElement>) =>
      setState({ Title: e.target.value }),
    URL: (e: React.ChangeEvent<HTMLInputElement>) =>
      setState({ URL: e.target.value }),
  };
  console.log(formState);

  const postData = () => {
    const uid = auth.currentUser.uid
    const userRef = db.collection('user').doc(uid)
    const postRef = userRef.collection('posts').doc()
    postRef.set({
      Lyric: formState.Lyric,
      Artist: formState.Artist,
      Title: formState.Title,
      youtubeURL: formState.URL,
      author: uid,
      likeCount: 0,
    });
    setFormState(initialFormState);
  };
  return (
    <Box
      component="form"
      textAlign="center"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch", },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="歌詞"
        variant="outlined"
        onChange={inputCallback.Lyric}
      />
      <br />
      <TextField 
        id="outlined-basic"
        label="アーティスト名"
        variant="outlined"
        onChange={inputCallback.Artist}
      />
      <br />
      <TextField
        id="outlined-basic"
        label="曲名"
        variant="outlined"
        onChange={inputCallback.Title}
      />
      <br />
      <TextField
        id="outlined-basic"
        label="YouTube URL"
        variant="outlined"
        onChange={inputCallback.URL}
      />
      <br />
      <Button variant="contained" onClick={postData}>
        歌詞を投稿する
      </Button>
    </Box>
  );
  
};

export default ObjectStateForm;

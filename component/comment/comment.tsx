import { useState } from "react";
import { db, auth } from "../../firebase";
import firebase from "firebase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type PostsType = {
  text: string;
};

const initialFormState: PostsType = {
  text: "",
};

const AddComment = () => {
  const [formState, setFormState] = useState(initialFormState);
  const setState = (value: Partial<PostsType>) => {
    setFormState({
      ...formState,
      ...value,
    });
  };

  const addCommentData = () => {
    const uid = auth.currentUser.uid;
    const userRef = db.collection("user").doc(uid);
    const postRef = userRef.collection("posts").doc();
    postRef.set({
      text: formState.text,
      userRef: userRef.path,
      postRef: postRef.path,
      createTime: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFormState(initialFormState);
  };
  const inputCallback = {
    text: (e: React.ChangeEvent<HTMLInputElement>) =>
      setState({ text: e.target.value }),
  };
  return (
    <Box
      component="form"
      textAlign="center"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="コメント"
        variant="outlined"
        onChange={inputCallback.text}
      />
      <Button variant="contained" onClick={addCommentData}>
        コメントする
      </Button>
    </Box>
  );
};

export default AddComment;

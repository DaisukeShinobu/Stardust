import React, { useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { auth } from "../../firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const myStyle = {
  "& .MuiInputBase-input": {
    color: "#FFFFFF", // 入力文字の色
  },
  "& label": {
    color: "#AAAAAA", // 通常時のラベル色
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#CCCCCC", // 通常時のボーダー色
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "#DDDDDD", // ホバー時のボーダー色
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#CCCCCC", // 通常時のボーダー色(アウトライン)
    },
    "&:hover fieldset": {
      borderColor: "#DDDDDD", // ホバー時のボーダー色(アウトライン)
    },
  },
};

const theme = createTheme({
  palette: {
    neutral: {
      main: "#fff",
      contrastText: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
  },
});

const ButtonText = {
  "& 	.MuiButton-containedPrimary": {
    color: "#FFF",
  },
};

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

const ObjectStateForm: React.FC = () => {
  const router = useRouter();
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


  const postData = async () => {
    const uid = auth.currentUser.uid;
    const userRef = db.collection("user").doc(uid);
    const postRef = userRef.collection("posts").doc();
    await postRef.set({
      Lyric: formState.Lyric,
      Artist: formState.Artist,
      Title: formState.Title,
      youtubeURL: formState.URL,
      author: uid,
      likeCount: 0,
      id: "",
    });
    
    postRef.update({
      postid: postRef.id,
    });
    
    router.push("/");
  };

  return (
    <Box
      component="form"
      textAlign="center"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch", color: "text.primary" },
      }}
      noValidate
      autoComplete="off"
    >
      <br />
      <br />
      <TextField
        sx={myStyle}
        id="outlined-basic"
        label="歌詞を入力"
        variant="outlined"
        onChange={inputCallback.Lyric}
      />
      <br />
      <TextField
        sx={myStyle}
        id="outlined-basic"
        label="アーティスト名を入力"
        variant="outlined"
        onChange={inputCallback.Artist}
      />
      <br />
      <TextField
        sx={myStyle}
        id="outlined-basic"
        label="曲名を入力"
        variant="outlined"
        onChange={inputCallback.Title}
      />
      <br />
      <TextField
        sx={myStyle}
        id="outlined-basic"
        label="YouTube URLを入力"
        variant="outlined"
        onChange={inputCallback.URL}
      />
      <br />
      <ThemeProvider theme={theme}>
        <Button
          sx={ButtonText}
          variant="contained"
          color="neutral"
          onClick={() => {
            postData();
          }}
        >
          歌詞を投稿する
        </Button>
      </ThemeProvider>
    </Box>
  );
};

export default ObjectStateForm;

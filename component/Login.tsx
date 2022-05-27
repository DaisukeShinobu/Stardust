import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { signInWithGoogle } from "../auth/GoogleAuthProvider";
import { db } from "../firebase";
import { signInWithTwitter } from "../auth/TwitterAuthProvider";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import { colors } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#FFFFFF",
      dark: "#271B33",
      light: "",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
  },
});

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

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="#FFFFFF" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit">Stardust</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const SignInSide = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      user && router.push("/home");
    });
    return () => unSub();
  }, [router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            bgcolor: "primary.main",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sx={{ bgcolor: "primary.dark" }}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 10,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "primary.main", fontSize: 20 }}>
              <b>5</b>秒で読める　<b>300</b>以上の歌詞
            </Typography>
            <br />
            <Typography sx={{ color: "primary.main", fontSize: 20 }}>
              歌詞から曲を好きになる
              <br />
              音楽発見プラットフォーム
              <br />
            </Typography>
            <br />
            <Typography sx={{ color: "primary.main", fontSize: 25 }}>
              <b>Stardust</b>
            </Typography>
            <br />
            <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              sx={{ m: 1, color: "primary.main", fontSize: 20 }}
              component="h1"
              variant="h5"
            >
              {isLogin ? "ログイン" : "アカウント登録"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                sx={myStyle}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                autoComplete="email"
                autoFocus
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                sx={myStyle}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={
                  isLogin
                    ? async () => {
                        try {
                          await auth.signInWithEmailAndPassword(
                            email,
                            password
                          );
                          router.push("/");
                        } catch (error) {
                          alert(error.message);
                        }
                      }
                    : async () => {
                        try {
                          await auth.createUserWithEmailAndPassword(
                            email,
                            password
                          );
                          const uid = auth.currentUser.uid;
                          const userRef = db.collection("user").doc(uid);
                          await userRef.set({
                            likePostCount: 0,
                          });
                          router.push("/");
                        } catch (error) {
                          alert(error.message);
                        }
                      }
                }
              >
                {isLogin ? "ログイン" : "登録"}
              </Button>
              <Grid container>
                <Grid item onClick={() => setIsLogin(!isLogin)}>
                  <Link href="#" variant="body2">
                    {isLogin
                      ? "新しいアカウントを作成する"
                      : "ログイン画面に戻る"}
                  </Link>
                </Grid>
              </Grid>
              <Button
                onClick={signInWithTwitter}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
              >
                <TwitterIcon />
                　Twitterでログイン
              </Button>
              <Button
                onClick={signInWithGoogle}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 0, mb: 2 }}
              >
                <GoogleIcon />　 Googleでログイン
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignInSide;

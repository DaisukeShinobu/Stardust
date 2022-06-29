import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import Logout from "./Logout";
import Typography from "@mui/material/Typography";
import { CenterFocusStrong } from "@mui/icons-material";
import Link from "next/link";

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

const LogOut = () => {
  return <a onClick={Logout}>ログアウト</a>;
};

export const Footer2 = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "1",
          display: "flex",
          justifyContent: "space-evenly",
          bottom: "0",
          position: "fixed",
          bgcolor: "primary.dark",
          color: "primary.main",
          p: 2,
        }}
      >
        <Link href="/home">
          <a>HOME</a>
        </Link>
        <Link href="/postLyric">
          <a>歌詞を投稿する</a>
        </Link>
        <Link href="/">
          <LogOut />
        </Link>
      </Box>
    </ThemeProvider>
  );
};

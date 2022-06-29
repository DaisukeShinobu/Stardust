import React from "react";
import Logout from "./Logout";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

export const 
LabelBottomNavigation = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
     <BottomNavigation
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "primary.dark",
          color: "primary.main",
        }}
        showLabels
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Home"
          sx={{ color: "primary.main" }}
          value="backHome"
          icon={<HomeIcon />}
          href="/home"
        />
        <BottomNavigationAction
          label="歌詞を投稿する"
          sx={{ color: "primary.main" }}
          value="post"
          icon={<AddCircleIcon />}
          href="/postLyric"
        />
        <BottomNavigationAction
          label="ログアウト"
          sx={{ color: "primary.main" }}
          value={Logout}
          icon={<LogoutIcon />}
        />
      </BottomNavigation> 
      <Link href="/home"><a>HOME</a></Link>
      <Link href="/postLyric"><a>歌詞を投稿する</a></Link>
      <Link href="/"><a>ログアウト</a></Link>
    </ThemeProvider>
  );
};

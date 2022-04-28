import React from "react";
import Logout from "./Logout";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import styles from "./Footer.module.css";

export const LabelBottomNavigation = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      className={styles.footer}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        className={styles.Home}
        label="Home"
        value="backHome"
        icon={<HomeIcon />}
        href="/home"
      />
      <BottomNavigationAction
        className={styles.AddPosts}
        label="歌詞を投稿する"
        value="post"
        icon={<AddCircleIcon />}
        href="/post"
      />
      <BottomNavigationAction
        className={styles.Logout}
        label="ログアウト"
        value={Logout}
        icon={<LogoutIcon />}
      />
    </BottomNavigation>
  );
};

const Header = () => {
  return (
    <div>
      <button onClick={Logout}>ログアウト</button>
    </div>
  );
};

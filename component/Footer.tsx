import React from "react";
import Logout from "./Logout";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";

export const LabelBottomNavigation = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="backHome"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="歌詞を投稿する"
        value="post"
        icon={<AddCircleIcon />}
        href="/post"
      />
      <BottomNavigationAction
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

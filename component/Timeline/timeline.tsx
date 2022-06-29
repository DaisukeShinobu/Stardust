import React from "react";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./posts.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

type PostsType = {
  Lyric: string;
  Artist: string;
  Title: string;
  URL: string;
  Tags: string[];
  Author: string;
  id: string;
};

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#FFFFFF",
      dark: "#322F45",
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

const Timeline: React.FC<PostsType> = (props) => {
  const router = useRouter();
  const DetailLink = () => {
    router.push(`/${props.id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          maxWidth: 450,
          mx: "auto",
          mt: 15,
          mb: 5,
          bgcolor: "primary.dark",
          color: "primary.main",
        }}
      >
        <CardHeader />
        <CardContent>
          <Typography className={styles.lyric}>
            <span>"{props.Lyric}"</span>
            <br />
          </Typography>
          <br />
          <br />
          <Typography>
            {props.Title}
            <br />
            {props.Artist}
            <button className={styles.detailbutton} onClick={DetailLink}>
              くわしく見る
            </button>
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default Timeline;

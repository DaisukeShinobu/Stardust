import React from "react";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import styles from "./posts.module.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TagIcon from "@mui/icons-material/Tag";
import CommentDrawer from "../comment/commentDrawer";
import ShareButton from "../share/sharebutton";
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

const Posts: React.FC<PostsType> = (props) => {
  const router = useRouter();
  const param = router.query;
  const URL = "https://stardustmusic.jp/" + param.id;
  const DetailLink = () => {
    router.push(`/${props.id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        className={styles.post}
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
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="share" href={props.URL}>
            <YouTubeIcon className={styles.Share} />
          </IconButton>
          <ShareButton url={URL} title={props.Lyric} />
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default Posts;

import React from "react";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import styles from "./posts.module.css";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TagIcon from "@mui/icons-material/Tag";
import CommentDrawer from "../comment/commentDrawer";

type PostsType = {
  Lyric: string;
  Artist: string;
  Title: string;
  URL: string;
  Tags: string[];
  Author: string;
  id: string;
};



const Posts: React.FC<PostsType> = (props) => {
  const router = useRouter();
  const DetailLink = () => {
    router.push(`/${props.id}`);
  }

  return (
    <Card
      className={styles.post}
      sx={{ maxWidth: 450, mx: "auto", mt: 15, mb: 5 }}
    >
      <CardHeader />
      <CardContent>
        <Typography className={styles.lyric}>
          <span>"{props.Lyric}"</span>
          <br />
        </Typography>
        <br />
        <Typography className={styles.post2}>
          {props.Title}
          <br />
          {props.Artist}<button onClick={DetailLink}>くわしく見る</button>
          {props.id},,,,,
          {props.Author}
          <br />
          <br />
        </Typography>
        <Typography className={styles.Tags}>{props.Tags}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon className={styles.Favo} />
        </IconButton>
        <CommentDrawer />
        <IconButton aria-label="share">
          <ShareIcon className={styles.Share} />
        </IconButton>
        <IconButton aria-label="share" href={props.URL}>
          <YouTubeIcon className={styles.Share} />
        </IconButton>
        <IconButton aria-label="share">
          <TagIcon className={styles.Share} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Posts;

import React from "react";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./posts.module.css";

type PostsType = {
  Lyric: string;
  Artist: string;
  Title: string;
  URL: string;
  Tags: string[];
  Author: string;
  id: string;
};

const Timeline: React.FC<PostsType> = (props) => {
  const router = useRouter();
  const DetailLink = () => {
    router.push(`/${props.id}`);
  };

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
          {props.Artist}
          <button className={styles.detailbutton} onClick={DetailLink}>くわしく見る</button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Timeline;

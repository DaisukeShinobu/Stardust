import React from 'react'
import { db } from "../../firebase";
import { useRouter } from "next/router";
import Link from 'next/link'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';


type PostsType = {
    Lyric: string;
    Artist: string;
    Title: string;
    URL: string;
    id: string;
  };

const Posts: React.FC<PostsType> = (props) => {
    return (
        <Card sx={{ maxWidth: 345, mx: "auto", mb: 10 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={props.Title}
            subheader={props.Artist}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
            "{props.Lyric}"
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      );
}

export default Posts
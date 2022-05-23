import { TwitterShareButton, FacebookShareButton } from "react-share";
import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import styles from "./share.module.css";

type shareButtonType = {
  url: string;
  title: string;
};

const ShareButton: React.FC<shareButtonType> = (props) => {
  return (
    <div>
      <TwitterShareButton url={props.url} title={props.title}>
        <TwitterIcon className={styles.Twitter} />
      </TwitterShareButton>
      <FacebookShareButton url={props.url} quote={props.title}>
        <FacebookIcon className={styles.Twitter} />
      </FacebookShareButton>
    </div>
  );
};

export default ShareButton;

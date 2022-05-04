import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import IconButton from "@mui/material/IconButton";
import styles from './comment.module.css';
import AddComment from './comment';

type Anchor = "bottom";

const CommentDrawer = () => {
  const [state, setState] = React.useState({
    bottom: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list =
    "ここにコメントの追加ボタンが表示されて、その下にコメント一覧が出る";

  return (
    <div>
      <IconButton onClick={toggleDrawer("bottom", true)} aria-label="comments">
        <ChatBubbleIcon className={styles.commentIcon} />
      </IconButton>
      <Drawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
      >
        <AddComment />
      </Drawer>
    </div>
  );
};

export default CommentDrawer

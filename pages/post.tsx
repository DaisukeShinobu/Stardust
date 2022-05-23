import React from "react";
import ObjectStateForm from "../component/post/postLyric"
import { LabelBottomNavigation } from "../component/Footer";
import Box from "@mui/material/Box";


const post = () => {
  return (
    <Box>
      <ObjectStateForm />
      <LabelBottomNavigation />
    </Box>
  )
};

export default post;

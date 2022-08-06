import { Card, CardContent, Typography } from "@mui/material";
import { TPost } from "../types";

type TProps = {
  post: TPost;
};
export const Post = ({ post }: TProps) => {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

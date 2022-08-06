import { Card, CardContent, Typography } from "@mui/material";
import { formatDate } from "../lib/helpers";
import { TPost } from "../types";

type TProps = {
  post: TPost;
};
export const Post = ({ post }: TProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="caption" component="div">
            by @{post.username}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
        <Typography variant="caption" component="div">
            {formatDate(post.createdAt.toDate())}
        </Typography>
      </CardContent>
    </Card>
  );
};

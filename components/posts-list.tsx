import { Stack } from "@mui/material";
import { TPost } from "../types";
import { Post } from "./post";

type TProps = {
  posts: Array<TPost>;
};

export const PostsList = ({ posts }: TProps) => (
  <Stack spacing={2}>
    {posts.map((post) => (
      <Post key={post.id} post={post} />
    ))}
  </Stack>
);

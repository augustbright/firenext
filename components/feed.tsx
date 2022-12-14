import { collectionGroup, getDocs, orderBy, query } from "firebase/firestore";
import {useEffect, useState} from "react";
import { firestore } from "../lib/firebase";
import { TPost } from "../types";
import { PostsList } from "./posts-list";

export const Feed = () => {
  const [posts, setPosts] = useState<TPost[]>([]);

  //TODO make common interface for data providing

  useEffect(() => {
    const fetchPosts = async () => {
      const postsQuery = query(collectionGroup(firestore, 'posts'), orderBy('createdAt'));
      const docsSnapshot = await getDocs(postsQuery);
      const docs = docsSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }) as TPost);
      setPosts(docs);
    }
    fetchPosts();
  }, []);

  return <PostsList posts={posts} />;
};

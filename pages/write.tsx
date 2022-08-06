import { addDoc, collection } from "firebase/firestore";
import { useCallback } from "react";
import { toast } from "react-toastify";
import EditPost, { TForm } from "../components/edit-post";
import useUserData from "../hooks/use-user-data";
import { firestore } from "../lib/firebase";

const Write = () => {
  const { user } = useUserData();
  const handleSubmit = useCallback(async (data: TForm) => {
    if (!user) return;
    const postsRef = collection(firestore, "posts");
    try {
        await addDoc(postsRef, {
            ...data,
            uid: user.uid,
            published: false
        });
        toast.success('Post is saved');    
    } catch {
        toast.error('Failed to save post');
    }
  }, [user]);
  return <EditPost onSubmit={handleSubmit} />;
};

export default Write;

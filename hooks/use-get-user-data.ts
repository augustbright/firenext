import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, firestore } from "../lib/firebase";
import { TUserProfile } from "../types";

const useGetUserData = () => {
  const [userProfileLoading, setUserProfileLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<TUserProfile | undefined>();

  useEffect(() => {
    let unsubscribe;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(collection(firestore, "users"), user.uid);
        unsubscribe = onSnapshot(docRef, (doc) => {
          const userProfile = doc.data() as TUserProfile | undefined;
          if (userProfile) {
            setUserProfile({
              ...userProfile,
              uid: user.uid,
            });
          } else {
            setUserProfile(undefined);
          }
          setUserProfileLoading(false);
        });
      } else {
        setUserProfileLoading(false);
        setUserProfile(undefined);
      }
    });
    return unsubscribe;
  }, []);

  return {
    user: userProfile || null,
    userLoading: userProfileLoading,
  };
};

export default useGetUserData;

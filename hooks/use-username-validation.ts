import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../lib/firebase";

const re = /^[a-zA-Z0-9]+$/;

export const useUsernameValidation = (username: string | null, currentUsername: string | null) => {
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState<boolean | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (!username || username === currentUsername) {
      setLoading(false);
      setValid(null);
      setErrorText(null);
      return;
    }

    if (!re.test(username)) {
      setLoading(false);
      setValid(false);
      setErrorText("Username is incorrect");
      return;
    }

    setLoading(true);
    getDoc(doc(firestore, "usernames", username)).then((doc) => {
      if (doc.exists()) {
        setValid(false);
        setErrorText("Username is taken");
      } else {
        setValid(true);
        setErrorText(null);
      }
      setLoading(false);
    });
  }, [username]);

  return {
    loading,
    valid,
    errorText
  };
};

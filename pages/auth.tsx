import { Box, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useCallback } from "react";
import { auth, googleAuthProvider } from "../lib/firebase";
import { signInAnonymously, signInWithPopup } from "firebase/auth";
import { GuestsOnly } from "../components/guests-only";

const Auth = () => {
  const handleGoogleClick = useCallback(() => {
    signInWithPopup(auth, googleAuthProvider);
  }, []);

  const handleAnonymousClick = useCallback(() => {
    signInAnonymously(auth);
  }, []);

  return (
    <GuestsOnly>
      {" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Button
          variant="outlined"
          endIcon={<GoogleIcon />}
          onClick={handleGoogleClick}
        >
          Google
        </Button>
        <Button variant="text" onClick={handleAnonymousClick}>
          Anonymous
        </Button>
      </Box>
    </GuestsOnly>
  );
};

export default Auth;

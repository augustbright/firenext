import {
  Avatar,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import useUserData from "../hooks/use-user-data";
import { TUserProfile } from "../types";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useState } from "react";
import { doc, writeBatch } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { toast } from "react-toastify";
import { useUsernameValidation } from "../hooks/use-username-validation";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type TProps = {
  user: TUserProfile;
};

export const UserProfile = ({ user }: TProps) => {
  const [editMode, setEditMode] = useState(false);
  const { user: currentUser } = useUserData();
  const currentUid = currentUser?.uid;
  const isCurrentUser = currentUid === user.uid;

  const handleClickEdit = useCallback(() => {
    setEditMode(true);
  }, []);

  const currentUsername = user?.username || null;
  const [name, setName] = useState<string | null>(currentUsername);
  const handleChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [setName]
  );

  const { loading, valid, errorText } = useUsernameValidation(
    name,
    currentUsername
  );

  const handleClickSave = useCallback(async () => {
    if (!user || !name || loading) return;

    const batch = writeBatch(firestore);

    if (currentUsername) {
      const currentUsernameRef = doc(firestore, "usernames", currentUsername);
      batch.delete(currentUsernameRef);
    }
    const usernameRef = doc(firestore, "usernames", name);
    const userRef = doc(firestore, "users", user.uid);
    batch.set(usernameRef, {
      uid: user.uid,
    });
    batch.set(
      userRef,
      {
        username: name,
      },
      {
        merge: true,
      }
    );

    setEditMode(false);
    await batch.commit();
    toast.success("Profile saved");
  }, [name, user, currentUsername, loading]);

  const handleClickCancel = useCallback(() => {
    setEditMode(false);
  }, []);

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        mb={editMode ? 1 : 3}
        mt={6}
      >
        <Avatar
          src={user.photoUrl || undefined}
          sx={{ width: 120, height: 120 }}
        />
      </Grid>

      {editMode && (
        <Grid item xs={12} display="flex" justifyContent="center" mb={3}>
          <Button size="small" variant="text" startIcon={<CloudUploadIcon />}>
            Upload
          </Button>
        </Grid>
      )}

      <Grid item xs={12} display="flex" justifyContent="center">
        {editMode ? (
          <TextField
            variant="standard"
            label="username"
            type="text"
            value={name}
            onChange={handleChangeName}
            error={valid === false}
            helperText={errorText}
          />
        ) : (
          <Typography variant="subtitle1">@{user.username}</Typography>
        )}
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center">
        <Typography variant="h3">{user.displayName}</Typography>
      </Grid>
      {isCurrentUser && (
        <Grid item xs={12} display="flex" justifyContent="center" mt={4}>
          {editMode ? (
            <>
              <Button variant="contained" onClick={handleClickSave}>
                Save
              </Button>
              <Button
                variant="text"
                onClick={handleClickCancel}
                color="secondary"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              onClick={handleClickEdit}
              size="small"
              variant="text"
              color="secondary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          )}
        </Grid>
      )}
    </Grid>
  );
};

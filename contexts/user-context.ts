import { createContext } from "react";
import { TUserProfile } from "../types";

type UserContext = {
  user: TUserProfile | null;
  userLoading: boolean;
};

const UserContext = createContext<UserContext>({
  user: null,
  userLoading: true
});

export default UserContext;

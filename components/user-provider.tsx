import { PropsWithChildren } from "react";
import UserContext from "../contexts/user-context";
import useGetUserData from "../hooks/use-get-user-data";

export const UserProvider = ({ children }: PropsWithChildren) => {
  const userData = useGetUserData();
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
};

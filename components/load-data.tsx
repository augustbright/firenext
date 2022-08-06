import { CircularProgress } from "@mui/material";
import { PropsWithChildren } from "react";
import useUserData from "../hooks/use-user-data";

export const LoadData = ({ children }: PropsWithChildren) => {
  const { userLoading } = useUserData();
  if (userLoading) return <CircularProgress color="info" />;

  return <>{children}</>;
};

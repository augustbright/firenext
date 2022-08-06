import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import useUserData from "../hooks/use-user-data";

type Props = {
  fallback?: string;
};

export const UsersOnly = ({
  children,
  fallback = "/",
}: PropsWithChildren<Props>) => {
  const router = useRouter();
  const { user, userLoading } = useUserData();
  if (userLoading) return <CircularProgress />;

  if (!user) {
    router.replace(fallback);
    return <></>;
  }

  return <>{children}</>;
};

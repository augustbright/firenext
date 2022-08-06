import "../styles/globals.css";
import type { AppProps } from "next/app";
import AppBar from "../components/app-bar";
import { Container } from "@mui/material";
import { UserProvider } from "../components/user-provider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <AppBar />
      <Container sx={{ pt: 3 }}>
        <Component {...pageProps} />
      </Container>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
    </UserProvider>
  );
}

export default MyApp;

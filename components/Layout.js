import { useEffect } from "react";
import Header from "./Header";
import Head from "next/head";
import runOneSignal from "../utils/runOneSignal";
import Box from "@mui/material/Box";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

export default function Layout({ children }) {
  useEffect(() => {
    runOneSignal();
  }, []);

  return (
    <div>
      <Head>
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <meta name='Winnipeg Transit WebApp' content='Winnipeg Buses timetable' />
        <title>Winnipeg Transit Webapp </title>
        <meta
          name='Description'
          content='Check the live bus timetable of the transit stops near your in Winnipeg .'
        />
        <meta name='Keywords' content='Winnipeg Transit, Winnipeg Bus timetable' />
      </Head>
      <Header />
      <Box component='main'>
        <Toolbar />
        <ToastContainer
          position='top-center'
          style={{
            position: "relative",
            width: "100%",
            padding: "1px",
          }}
        />
        <Container sx={{ mt: 1, p: 0 }}>{children}</Container>
      </Box>
    </div>
  );
}

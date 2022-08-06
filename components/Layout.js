import React from "react";
import Header from "./Header";
import Head from "next/head";
import Script from "next/script";

export default function Layout({ children }) {
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
      <main>{children}</main>
      <Script src='https://cdn.onesignal.com/sdks/OneSignalSDK.js'></Script>
    </div>
  );
}

import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: process.env.NEXT_PUBLIC_SIGNAL_APPID,
    allowLocalhostAsSecureOrigin: true,
  });
  OneSignal.showSlidedownPrompt();
}

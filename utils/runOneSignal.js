import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  await OneSignal.init({
    appId: process.env.NEXT_PUBLIC_SIGNAL_APPID,
    safari_web_id: process.env.NEXT_PUBLIC_SIGNAL_SAFARI_WEB_ID,
    notifyButton: {
      enable: true,
    },
    allowLocalhostAsSecureOrigin: true,
  });
  OneSignal.showSlidedownPrompt();
}

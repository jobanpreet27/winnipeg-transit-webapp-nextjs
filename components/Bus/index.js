import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import AlarmIcon from "@mui/icons-material/Alarm";
import Avatar from "@mui/material/Avatar";
import OneSignal from "react-onesignal";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function Bus({ bus, stopId }) {
  const [isPushNotificationsSupported, setIsPushNotificationsSupported] =
    useState(false);

  const setAlert = async (busKey, routeKey) => {
    if (!isPushNotificationsSupported) {
      toast.error("Notifications are not supported on this device!!");
      return;
    }
    const userId = await OneSignal.getUserId();
    const isNotificationsEnabled = await OneSignal.isPushNotificationsEnabled();

    if (!isNotificationsEnabled) {
      toast.error("Notifications are not enabled!! Click on bell icon below");
      return;
    }
    try {
      fetch("/api/alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, busKey, stopId, routeKey }),
      });
      toast.success(
        "Notification Added! You will be notified when your bus is 5 mins away. "
      );
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong! Try again later.");
    }
  };

  useEffect(() => {
    if (window.OneSignal.isPushNotificationsSupported()) {
      setIsPushNotificationsSupported(true);
    }
  }, []);

  return (
    <Card sx={{ marginBottom: 1 }} variant='outlined'>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "primary.main" }}>{bus.route}</Avatar>}
        title={bus.variant.name}
        subheader={bus.departureTime}
        action={
          <IconButton onClick={() => setAlert(bus.key, bus.route)}>
            <AlarmIcon />
          </IconButton>
        }
      />
    </Card>
  );
}
